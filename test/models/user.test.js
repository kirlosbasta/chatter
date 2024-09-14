import { expect } from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { after, beforeEach, describe, it } from 'mocha';
import User from '../../src/models/user.js';

dotenv.config();
mongoose.connect('mongodb://127.0.0.1:27017/Test');

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(() => {
    mongoose.disconnect();
  });

  it('should create a user instance', async () => {
    const user = await User.create({
      username: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    });
    expect(user).to.have.property('_id');
    expect(user).to.be.an.instanceOf(User);
  });

  it('should hash user password on creation', async () => {
    const user = await User.create({
      username: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    });
    expect(user.password).to.not.equal('123456');
  });

  it('should hash user password on update', async () => {
    const user = await User.create({
      username: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    });
    user.password = '1234';
    await user.save();
    const updatedUser = await User.findById(user._id);
    expect(updatedUser.password).to.not.equal('1234');
  });

  it('should have isValidPassword method and check for password', async () => {
    const user = await User.create({
      username: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    });
    expect(user.isValidPassword).to.be.a('function');
    expect(await user.isValidPassword('123456')).to.be.equal(true);
    expect(await user.isValidPassword('12346')).to.be.equal(false);
  });

  it('should fail if not valid email', async () => {
    const user = new User({
      username: 'John Doe',
      email: 'johnDoe.com',
      password: '123456',
    });
    const result = user.validateSync();
    expect(result.message).to.be.equal(
      'User validation failed: email: Input is not a valid email',
    );
  });

  it('should generate token', async () => {
    const user = await User.create({
      username: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    });
    expect(user.generateToken).to.be.a('function');
    const token = user.generateToken();
    expect(token).to.be.a('string');
  });
});
