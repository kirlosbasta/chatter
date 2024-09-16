import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';
import ChatModel from '../models/chat.model.js';
import ChatMessageModel from '../models/message.model.js';

mongoose.connect('mongodb://127.0.0.1:27017/ChatterDB');
const deleteSeed = async () => {
  await UserModel.deleteMany({});
  await ChatMessageModel.deleteMany({});
  await ChatModel.deleteMany({});

  console.log('Finished deleting');
  process.exit(0);
};
deleteSeed();
