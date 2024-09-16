import asyncHandler from 'express-async-handler';
import validator from 'validator';
import ChatModel from '../models/chat.model.js';

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get all user previos chats group or one to one
 */
const getAllChatsController = asyncHandler(async (req, res) => {
  console.log('inside get All Controller');
  const allChats = await ChatModel.aggregate([
    {
      $match: {
        users: { $elemMatch: { $eq: req.user._id } },
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
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
        ],
      },
    },
    {
      $addFields: { lastMessage: { $first: '$lastMessage' } },
    },
  ]);
  console.log(allChats);
  res.status(200);
  return res.json(allChats);
});
// retrive a chat with a user if exist and create if not
// delete chat with all it's messages
// create a group chat
// add myself to group chat
// leave group chat
// delete a group chat if i'm the admin with all the messages
export { getAllChatsController };
