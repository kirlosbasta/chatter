import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import ChatterError from './ChatterError.js';

/**
 * @param {string} token - JWT token
 *
 * @description This function is responsible to authenticate the user based on the token provided
 */
const authenticateUser = async (token) => {
  try {
    if (!token) {
      console.log('token', token);
      throw new ChatterError(401, 'Authentication failed');
    }
    const parserdToken = token.split(' ')[1];
    const decoded = jwt.verify(parserdToken, process.env.JWT_SECRET);
    const user = await UserModel.findById(
      decoded.id,
      '-password -resetPasswordToken',
    );
    return user;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export { authenticateUser };
