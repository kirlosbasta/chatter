import AsyncHandler from 'express-async-handler';
import ChatterError from '../../utils/ChatterError.js';
import UserModel from '../../models/user.model.js';

/**
 *
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 *
 * @description - Register a new user if not exist
 */
async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username) {
    throw new ChatterError(400, 'Username is Missing');
  } else if (!email) {
    throw new ChatterError(400, 'Email is Missing');
  } else if (!password) {
    throw new ChatterError(400, 'Password is Missing');
  }
  let user = await UserModel.findOne({ email }).exec();
  if (user) throw new ChatterError(400, 'Email is already exist');
  user = await UserModel.findOne({ username }).exec();
  if (user) throw new ChatterError(400, 'Username is already exist');
  user = await UserModel.create({ username, email, password });
  res.status(201);
  return res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: user.generateToken(),
  });
}

const registerController = AsyncHandler(register);

export default registerController;
