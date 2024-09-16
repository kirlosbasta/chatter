import AsyncHandler from 'express-async-handler';
import ChatterError from '../../utils/ChatterError.js';
import UserModel from '../../models/user.model.js';

/**
 *
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 *
 * @description - login a user if exist with the given credentials
 */
async function login(req, res) {
  const { username, password } = req.body;
  if (!username) {
    throw new ChatterError(400, 'Username is Missing');
  } else if (!password) {
    throw new ChatterError(400, 'Password is Missing');
  }

  const user = await UserModel.findOne({ username }).exec();
  if (!user) throw new ChatterError(404, 'Username Not Found');
  if (!(await user.isValidPassword(password))) {
    throw new ChatterError(401, 'Invalid Password');
  }
  res.status(200);
  return res.json({
    _id: user._id,
    username: user.username,
    token: user.generateToken(),
  });
}

const loginController = AsyncHandler(login);

export default loginController;
