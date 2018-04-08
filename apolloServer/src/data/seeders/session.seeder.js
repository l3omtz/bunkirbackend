// Added data to our mLab DB
import mongoose from 'mongoose';
import Session from '../../models/deals';

const sessionSeeder = async () =>{
	const createSessionPromises = [];
	// await Session.remove({});

    const sessions = [
		{
			text: 'It the black friday deal at The Grass station! Come in and get all types of discounts on our top strains. Hurry in now!',
			image: 'https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183737/blog_post_section/attachment-image-70e73c6f-2e78-4090-a045-876e5fc1058a.jpg',
			company: 'The Grass Station'
		},
		{
			text: 'It the black friday deal at The Grass station! Come in and get all types of discounts on our top strains. Hurry in now!',
			image: 'https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183737/blog_post_section/attachment-image-70e73c6f-2e78-4090-a045-876e5fc1058a.jpg',
			company: 'The Grass Station'
		},
		{
			text: 'It the black friday deal at The Grass station! Come in and get all types of discounts on our top strains. Hurry in now!',
			image: 'https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183737/blog_post_section/attachment-image-70e73c6f-2e78-4090-a045-876e5fc1058a.jpg',
			company: 'The Grass Station'
		},
		{
			text: 'It the black friday deal at The Grass station! Come in and get all types of discounts on our top strains. Hurry in now!',
			image: 'https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183737/blog_post_section/attachment-image-70e73c6f-2e78-4090-a045-876e5fc1058a.jpg',
			company: 'The Grass Station'
		},
		{
			text: 'It the black friday deal at The Grass station! Come in and get all types of discounts on our top strains. Hurry in now!',
			image: 'https://assets2.roadtrippers.com/uploads/blog_post_section/attachment/image/183737/blog_post_section/attachment-image-70e73c6f-2e78-4090-a045-876e5fc1058a.jpg',
			company: 'The Grass Station'
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
