import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import ChatModel from '../models/chat.model.js';
import ChatMessageModel from '../models/message.model.js';

mongoose.connect('mongodb://127.0.0.1:27017/ChatterDB');

const listRandomUser = (users) => {
  const n = faker.number.int({ min: 2, max: users.length });
  const res = [];
  for (let i = 0; i < n; i += 1) {
    res.push(users[i]);
  }
  return res;
};

const seedChats = async (n) => {
  const users = await UserModel.find().exec();
  const selectedUser = listRandomUser(users);
  for (let i = 0; i < n; i += 1) {
    await ChatModel.create({
      name: faker.person.fullName(),
      isGroupChat: true,
      users: selectedUser,

      admin: selectedUser[0],
    });
  }
  console.log('Finished adding the chats');
  process.exit(0);
};

seedChats(5);
