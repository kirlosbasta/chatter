import { expect } from 'chai';
import {
  after,
  before,
  beforeEach,
  describe,
  it,
} from 'mocha';
import { faker } from '@faker-js/faker';
import sinon from 'sinon';
import registerController from '../../src/controllers/register.controller.js';
import UserModel from '../../src/models/user.js';
import ChatterError from '../../src/utils/ChatterError.js';

describe('Test register controller', () => {
  let user;
  let req;
  let res;
  let UserModelStup;
  let createStup;

  before(() => {
    res = {
      status: sinon.stub(),
      json: sinon.spy(),
    };

    UserModelStup = sinon.stub(UserModel, 'findOne');
    createStup = sinon.stub(UserModel, 'create');
  });
  beforeEach(() => {
    user = new UserModel({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    });
    user.generateToken = sinon.stub().returns('fake-token');
    req = {
      body: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    };
    UserModelStup.resetHistory();
    createStup.resetHistory();
    res.status.resetHistory();
    res.json.resetHistory();
  });
  after(() => {
    sinon.restore();
    sinon.reset();
  });

  it('should throw error 400 if username is missing', async () => {
    req.body.username = '';
    try {
      await registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Username is Missing');
    }
  });
  // check if username is passed to body
  it('should throw error 400 if password is missing', async () => {
    req.body.password = '';
    try {
      await registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Password is Missing');
    }
  });

  it('should throw error 400 if email is missing', async () => {
    req.body.email = '';
    try {
      await registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Email is Missing');
    }
  });

  it('should return 404 if username is not found', async () => {
    UserModelStup.returns({ exec: sinon.stub().returns(null) });
    try {
      registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(404);
      expect(error.message).to.be.equal('Username Not Found');
    }
  });

  it('should return 400 if email is already exist', async () => {
    UserModelStup.returns({ exec: sinon.stub().returns(user) });
    try {
      await registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Email is already exist');
    }
  });

  it('should return 400 if username is already exists', async () => {
    UserModelStup.withArgs({ email: user.email }).returns({
      exec: sinon.stub().returns(null),
    });
    UserModelStup.withArgs({ username: user.username }).returns({
      exec: sinon.stub().returns(user),
    });
    try {
      await registerController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Username is already exist');
    }
  });

  it('should return 200 with user info and token if credentials are valid', async () => {
    UserModelStup.withArgs({ email: user.email }).returns({
      exec: sinon.stub().returns(null),
    });
    UserModelStup.withArgs({ username: user.username }).returns({
      exec: sinon.stub().returns(null),
    });
    createStup.returns({ exec: sinon.stub().returns(user) });
    await registerController(req, res);
    expect(res.status.calledOnce).to.be.equal(true);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(
      res.json.calledWith({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: 'fake-token',
      }),
    ).to.be.equal(true);
  });
});
