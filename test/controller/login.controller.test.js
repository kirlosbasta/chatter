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
import loginController from '../../src/controllers/login.controller.js';
import UserModel from '../../src/models/user.js';
import ChatterError from '../../src/utils/ChatterError.js';

describe('Test login controller', () => {
  let user;
  let req;
  let res;
  let UserModelStup;

  before(() => {
    res = {
      status: sinon.stub(),
      json: sinon.spy(),
    };

    UserModelStup = sinon.stub(UserModel, 'findOne');
  });
  beforeEach(() => {
    user = new UserModel({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    });
    req = {
      body: {
        username: user.username,
        password: user.password,
      },
    };
    UserModelStup.resetHistory();
    res.status.resetHistory();
    res.json.resetHistory();
  });
  after(() => {
    sinon.restore();
  });

  it('should throw error 400 if username is missing', async () => {
    req.body.username = '';
    try {
      await loginController(req, res);
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
      await loginController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(400);
      expect(error.message).to.be.equal('Password is Missing');
    }
  });

  it('should return 404 if username is not found', async () => {
    UserModelStup.returns({ exec: sinon.stub().returns(null) });
    try {
      loginController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(404);
      expect(error.message).to.be.equal('Username Not Found');
    }
  });

  it('should return 401 if password is invalid', async () => {
    sinon.stub(user, 'isValidPassword').resolves(false);
    UserModelStup.returns({ exec: sinon.stub().returns(user) });
    try {
      await loginController(req, res);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ChatterError);
      expect(error.statusCode).to.be.equal(401);
      expect(error.message).to.be.equal('Invalid Password');
      user.isValidPassword.restore();
    }
  });

  it('should return 200 with user info and token if credentials are valid', async () => {
    sinon.stub(user, 'isValidPassword').resolves(true);
    sinon.stub(user, 'generateToken').returns('fake-token');
    UserModelStup.returns({ exec: sinon.stub().returns(user) });
    await loginController(req, res);
    expect(res.status.calledOnce).to.be.equal(true);
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(
      res.json.calledWith({
        _id: user._id,
        username: user.username,
        token: 'fake-token',
      }),
    );
    user.isValidPassword.restore();
    user.generateToken.restore();
  });
});
