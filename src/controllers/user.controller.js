import validator from 'validator';
import asyncHandler from 'express-async-handler';
import ChatModel from '../models/chat.model.js';
import UserModel from '../models/user.model.js';
import ChatterError from '../utils/ChatterError.js';

/**
 * @description -  populate users and lastMessage fileds in chatModel
 */
const populateChat = [
  {
    $lookup: {
      from: 'users',
      localField: 'users',
      foreignField: '_id',
      as: 'users',
      pipeline: [
        {
          $project: {
            password: 0,
            resetPasswordToken: 0,
            __v: 0,
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: 'chatmessages',
      localField: 'lastMessage',
      foreignField: '_id',
      as: 'lastMessage',
      pipeline: [
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            foreignField: '_id',
            as: 'sender',
            pipeline: [
              {
                $project: {
                  username: 1,
                  email: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: { sender: { $first: '$sender' } },
        },
        {
          $project: {
            __v: 0,
          },
        },
      ],
    },
  },
  {
    $addFields: { lastMessage: { $first: '$lastMessage' } },
  },
  {
    $project: {
      __v: 0,
    },
  },
];

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get all users except the authenticated user
 */
const getUsersController = asyncHandler(async (req, res) => {
  const users = await UserModel.find(
    { _id: { $ne: req.user._id } },
    '-password -resetPasswordToken -__v',
  );
  return res.status(200).json(users);
});

export { getUsersController };
