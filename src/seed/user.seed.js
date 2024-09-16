import { faker } from '@faker-js/faker';
import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/ChatterDB');
const seedUsers = async (n) => {
  for (let i = 0; i < n; i += 1) {
    const username = faker.internet.userName();
    await UserModel.create({
      username: username,
      email: faker.internet.email(),
      password: username,
    });
  }
  console.log('Finished adding the users');
  process.exit(0);
};

seedUsers(20);
