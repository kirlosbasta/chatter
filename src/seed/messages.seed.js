import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import ChatModel from '../models/chat.model.js';
import ChatMessageModel from '../models/message.model.js';

mongoose.connect('mongodb://127.0.0.1:27017/ChatterDB');
const seedMessages = async (n) => {
  const users = await UserModel.find().exec();
  const chats = await ChatModel.find().exec();
  for (let i = 0; i < n; i += 1) {
    await ChatMessageModel.create({
      sender: users[faker.number.int(users.length)],
      content: faker.lorem.sentence({ min: 5, max: 20 }),
      chat: chats[faker.number.int(chats.length)],
    });
  }
  console.log('Finished adding the messages');
  process.exit(0);
};

seedMessages(100);
