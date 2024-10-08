import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import ChatModel from '../models/chat.model.js';
import ChatMessageModel from '../models/message.model.js';

mongoose.connect('mongodb://127.0.0.1:27017/ChatterDB');
const seedChats = async (n) => {
  const users = await UserModel.find().exec();
  for (let i = 0; i < n; i += 1) {
    const num1 = faker.number.int(users.length);
    const num2 = faker.number.int(users.length);
    await ChatModel.create({
      name: users[num2].username,
      isGroupChat: false,
      users: [users[num1], users[num2]],
      admin: users[num1],
    });
  }
  console.log('Finished adding the chats');
  process.exit(0);
};

seedChats(10);
