// Added data to our mLab DB
import mongoose from 'mongoose';
import Session from '../../models/session';

const sessionSeeder = async () =>{
	const createSessionPromises = [];
	await Session.remove({});

	const strains = [
        {
            ailments : "Anxiety / Depression",
            cbd : "0%",
            details : "Bruce Banner #3 is one of three phenotypes of the infamous \"Bruce Banner\" strain created by Delta 9 Labs. High Times Magazine has named it one of \"Earth's Strongest Strains.  Its best for treating ailments such as-muscle tension, anxiety and depression.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Bruce+Banner+%233.png",
            loc : "bruceBanner3",
            location : [
                "Denver, CO",
                "Portland, OR",
                "Seattle, WA"
            ],
            name : "Bruce Banner #3",
            ratio : "20% Indica / 80% Sativa",
            thc : "23-29%",
            type : "hybrid"
        },
        {
            ailments : "Stress",
            cbd : "1%",
            details : "Gorilla Glue #4 is a very potent strain of cannabis, mainly grown in Colorado. It can help with physical ailments such as arthritis and back pain. It is also been known to treat Obsessive Compulsive Disorder (OCD).",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Gorilla+Glue+%234.png",
            location : [
                "Denver, CO",
                "San Diego, CA",
                "Seattle, WA"
            ],
            name : "Gorilla Glue #4",
            ratio : "30% Indica / 70% Sativa",
            thc : "25-28%",
            type : "Hybrid"
        },
        {
            ailments : "Anxiety",
            cbd : "4%",
            details : "Holy Grail OG is an Hybrid dominant strain. The strain is also popularly referred to as Holy Grail Kush and is a cross between Kosher Kush and the OG #18 and has a complex flavor that is unique at the same time. The buds, however, are dense and large with blueish hues that make it stand apart from the rest of the crowd. ",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Holy+Grail+Kush.png",
            location : [
                "Denver, CO",
                "Los Angeles, CA",
                "Seattle, WA"
            ],
            name : "Holygrail Kush",
            ratio : "60% Indica / 40% Sativa",
            thc : "24-29%",
            type : "Hybrid"
        },
        {
            ailments : "Depression",
            cbd : "1%",
            details : "OG is considered one of the most famous Hybrid strains. The ailments it is most commonly associated with treating are depression, bipolar disorder, and anxiety. Some side affects are dry mouth and eyes are the most common negative effects. Always consult a medical marijuana doctor before usage.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/OG+Kush.png",
            location : [
                "Denver, CO",
                "Los Angeles, CA",
                "Mountlake Ter, WA"
            ],
            name : "Og Kush",
            ratio : "45% Indica / 55% Sativa",
            thc : "24%",
            type : "Hybrid"
        },
        {
            ailments : "Stress / Anxiety",
            cbd : "1%",
            details : "Afghani is a popular marijuana strains. It treats ailments such as stress, anxiety and chronic pain. It's best used for late evenings, to help with sleep. Dry mouth and dry eyes are common side effects. ",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Afghani.png",
            location : [
                "Denver, CO",
                "Los Angeles, CA",
                "San Francisco, CA"
            ],
            name : "Afghani",
            ratio : "95 Indica / 5 Sativa",
            thc : "16-20%",
            type : "Indica"
        },
        {
            ailments : "Insomnia",
            cbd : "1%",
            details : "Critical Kush was created by Barney's Breeder Farm as a potent cross between the insanely popular Critical Mass X OG Kush strains. Individuals will feel significant pain relief and uplifted. There is a slow buildup of sedation that will eventually ease individuals into sleep. Critical Kush is said to be an ideal strain for insomnia and stress.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Critical+Kush.png",
            location : [
                "Denver, CO",
                "Las Vegas, NV",
                "Spokane, WA"
            ],
            name : "Critical Kush",
            ratio : "90% Indica / 10% Sativa",
            thc : "25%",
            type : "Indica"
        },
        {
            ailments : "Insomnia",
            cbd : "0%",
            details : "King Louie XIII is a hard hitting strain. Individuals will experience a heavy yet euphoric feeling. It is best recommended for evenings or dealing with insomnia. It is also helpful with treating chronic pains and aches as well.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/King+Louis+XIII.png",
            location : [
                "Denver, CO",
                "Los Angeles, CA",
                "Phoenix, AZ"
            ],
            name : "King Louis XII",
            ratio : "70% Indica / 30% Sativa",
            thc : "20%",
            type : "Indica"
        },
        {
            ailments : "Relaxation",
            cbd : "0.3%",
            details : "The high that Mango creates is catered to giving the body a deep relaxation and euphoric feeling. Dry mouth is a common occurence but limited depending on the individual.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Mango.png",
            location : [
                "Bremerton, WA",
                "Detroit, MI",
                "Phoenix, AZ"
            ],
            name : "Mango",
            ratio : "65% Indica / 35% Sativa",
            thc : "11-22%",
            type : "Indica"
        },
        {
            ailments : "Chronic Pain Injury",
            cbd : "0%",
            details : "Alaskan Thunder is good for the morning or mid day for boost of energy. It has a banana and orange taste and gives an immediate high. The Alaskan Thunder none for treating ailments such as chronic pain and reocurring injuries.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Alaskan+Thunder.png",
            location : [
                "Detroit, MI",
                "Eugene, OR",
                "Phoenix, AZ"
            ],
            name : "Alaskan Thunder",
            ratio : "45% Indica / 55% Sativa",
            thc : "16-23%",
            type : "Sativa"
        },
        {
            ailments : "Stress",
            cbd : "2%",
            details : "Blue Dream is a cross between Blueberry and Haze strains. It has an immediate high that gives individuals focus and energy that comes quickly. Blue Dream is most helpfu for treating ailments such as stress, depression, and insomnia.  ",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Blue+Dream.png",
            location : [
                "Denver, CO",
                "Los Angeles, CA",
                "Seattle, WA"
            ],
            name : "Blue Dream",
            ratio : "40% Indica / 60% Sativa",
            thc : "17-24%",
            type : "Sativa"
        },
        {
            ailments : "Stress",
            cbd : "0%",
            details : "Lemon Haze is a cross between Silver Haze and Lemon Skunk. It is recognized for its freshly cut lemon smell. based on its heritage it is a hard hitting strain. It is known for being uplifting and euphoric. The ailments it treats are depression, stress and aches.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Lemon+Haze+.png",
            location : [
                "Detroit, MI",
                "Los Angeles, CA",
                "San Diego, CA"
            ],
            name : "Lemon Haze",
            ratio : "70% Indica / 40% Sativa",
            thc : "17-22%",
            type : "Sativa"
        },
        {
            ailments : "Depression",
            cbd : "0%",
            details : "Wet Dream is a cross between Blue Dream and Ocean Beach HazeWet Dream is known for giving an increase in energy. The high effects are felt immediately. Wet Dream is a favorite as a wake-and-bake for its energizing effects that won’t weight you down. The ailments it is known for treating are stress, anxiety, migraines and tension headaches.",
            imgUrl : "https://s3-us-west-2.amazonaws.com/bunkir/strains/Wet+Dream.png",
            location : [
                "Fresno, CA",
                "Los Angeles, CA",
                "Seattle, WA"
            ],
            name : "Wet Dream",
            ratio : "90% Indica / 10% Sativa",
            thc : "15% - 22%",
            type : "Sativa"
        }
    ];
    
    const sessions = [
		{
			day: 1,
			slot: '8:30-10:00',
			title: 'Registration and French Breakfast',
			speakers: []
		},
		{
			day: 1,
			slot: '10:00-10:30',
			title: 'Keynote',
			speakers: ['Dan Abramov']
		},
		{
			day: 1,
			slot: '10:30-11:00',
			title: 'Native Navigation for Every Platform',
			speakers: ['Eric Vicenti']
		},
		{
			day: 1,
			slot: '11:00-11:30',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 1,
			slot: '11:30-12:00',
			title: 'A cartoon guide to performance in React',
			speakers: ['Link Clark']
		},
		{
			day: 1,
			slot: '12:00-12:30',
			title: 'React Native <360FPS - Improving React Native animations>',
			speakers: ['Krzysztof Magiera']
		},
		{
			day: 1,
			slot: '12:30-14:00',
			title: 'French Buffet',
			speakers: []
		},
		{
			day: 1,
			slot: '14:00-14:30',
			title: 'Being Successful at Open Source',
			speakers: ['Christopher Chedeau']
		},
		{
			day: 1,
			slot: '14:30-15:00',
			title: 'GraphQL at Facebook',
			speakers: ['Dan Schafer']
		},
		{
			day: 1,
			slot: '15:00-15:30',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 1,
			slot: '15:30-16:00',
			title: 'A Deepdive Into Flow',
			speakers: ['Jeff Morrison']
		},
		{
			day: 1,
			slot: '16:00-16:30',
			title: 'Debugging flux applications in production',
			speakers: ['Mihail Diordiev']
		},
		{
			day: 1,
			slot: '16:30-17:00',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 1,
			slot: '17:00-17:30',
			title: 'On the Spectrum of Abstraction',
			speakers: ['Cheng Lou']
		},
		{
			day: 1,
			slot: '17:30-18:00',
			title: 'React Redux Analytics',
			speakers: ['Bertrand Karerangabo', 'Evan Schultz']
		},
		{
			day: 1,
			slot: '18:00-18:30',
			title: 'Lightning Talks',
			speakers: ['Various Speakers']
		},
		{
			day: 1,
			slot: '18:30-22:00',
			title: 'Dinner',
			speakers: []
		},
		{
			day: 2,
			slot: '8:30-10:00',
			title: 'Check-In and French Breakfast',
			speakers: []
		},
		{
			day: 2,
			slot: '10:00-10:30',
			title: 'Evolving the Visual Programming Environment with React',
			speakers: ['Jonas Gebhardt']
		},
		{
			day: 2,
			slot: '10:30-11:00',
			title: 'React Native Retrospective',
			speakers: ['Bonnie Eisenman']
		},
		{
			day: 2,
			slot: '11:00-11:30',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 2,
			slot: '11:30-12:00',
			title: 'The Evolution of React UI Development',
			speakers: ['Max Stoiber', 'Nik Graf']
		},
		{
			day: 2,
			slot: '12:00-12:30',
			title: 'Lightning Talks',
			speakers: ['Various Speakers']
		},
		{
			day: 2,
			slot: '12:30-14:00',
			title: 'French Buffet',
			speakers: []
		},
		{
			day: 2,
			slot: '14:00-14:30',
			title: 'Recomposing your React application',
			speakers: ['Andrew Clark']
		},
		{
			day: 2,
			slot: '14:30-15:00',
			title: 'JavaScript, React Native and Performance',
			speakers: ['Tadeu Zagallo']
		},
		{
			day: 2,
			slot: '15:00-15:30',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 2,
			slot: '15:30-16:00',
			title: 'Falcor: One Model Everywhere',
			speakers: ['Jafar Husain']
		},
		{
			day: 2,
			slot: '16:00-16:30',
			title: 'React with feeds and other long lists',
			speakers: ['Brent Vatne']
		},
		{
			day: 2,
			slot: '16:30-17:00',
			title: 'Coffee Break',
			speakers: []
		},
		{
			day: 2,
			slot: '17:00-17:30',
			title: 'GraphQL Future',
			speakers: ['Laney Kuenzel', 'Lee Bryon']
		},
		{
			day: 2,
			slot: '17:30-18:00',
			title: 'Progressive Enhancement for mobile apps: exploring the continuum between web apps and React Native',
			speakers: ['Martijn Walraven']
		},
		{
			day: 2,
			slot: '18:00-19:00',
			title: 'Q&A',
			speakers: ['Team']
		},
		{
			day: 2,
			slot: '19:00-20:00',
			title: 'Impromptu Lightning Talks Session',
			speakers: []
		},
		{
			day: 2,
			slot: '19:00-22:00',
			title: 'Drink Up',
			speakers: []
		}
	];


	sessions.forEach(sessions => {
		createSessionPromises.push(Session.create(sessions));
	});

	return Promise.all(createSessionPromises);
}

const closeConnection = () => {
    mongoose.connection.close( () => {
        console.log('Done, mongoose connection disconnected.');
    })
}

const initSeed = async () => {
    await mongoose.connect('mongodb://admin:admin@ds161159.mlab.com:61159/bunkir');

    console.log('***** seeding session instance...');
    await sessionSeeder();

    closeConnection();
}

initSeed();
