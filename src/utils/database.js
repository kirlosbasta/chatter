import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const url = process.env.MONGO_URI || 'mongodb://localhost:27017/';
  const database = process.env.DATABASE || 'test';
  try {
    await mongoose.connect(url + database);
    console.log('Connected to the database');
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
