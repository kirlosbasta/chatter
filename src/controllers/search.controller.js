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
 * @description - search for user by username or email by search query
 * by default it searches for both username and email fields
 * and if the search query is empty it will return an empty list
 */
const searchUsersController = asyncHandler(async (req, res) => {
  let { search } = req.query;
  let searchQuery;
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  }
  // sanitize the search query
  search = validator.escape(search);
  search = validator.trim(search);
  // if the query was just spaces
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  } else {
    // search for either username or email
    searchQuery = {
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const users = await UserModel.find(
    searchQuery,
    '-password -resetPasswordToken -__v',
  );

  res.status(200).json(users);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - search for chats by name of the receiver
 * by default it searches for chat name or receiver name
 * and if the search query is empty it will return a list of all chats
 */
const searchChatsController = asyncHandler(async (req, res) => {
  // get the search query
  let { search } = req.query;
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  }
  // sanitize the search query
  search = validator.escape(search);
  search = validator.trim(search);
  // if the query was just spaces
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  }
  const searchQuery = [
    {
      $match: {
        users: {
          $elemMatch: { $eq: req.user._id },
        },
      },
    },
    ...populateChat,
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          {
            isGroupChat: false,
            users: {
              $elemMatch: { username: { $regex: search, $options: 'i' } },
            },
          },
        ],
      },
    },
  ];
  // populate the chat with the receiver details
  const chats = await ChatModel.aggregate(searchQuery);
  return res.status(200).json(chats);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - search for group chats by name
 * by default it searches for chat name
 * and if the search query is empty it will return an empty list
 */
const searchGroupsController = asyncHandler(async (req, res) => {
  // get group name and sanitize it
  let { search } = req.query;
  // if group name is undefiend or empty string throw an error
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  }
  search = validator.escape(search);
  search = validator.trim(search);
  // if the query was just spaces throw an error
  if (!search) {
    throw new ChatterError(400, 'Search query is required');
  }
  // search for group chat with that name and populate it
  const groups = await ChatModel.aggregate([
    {
      $match: { isGroupChat: true, name: { $regex: search, $options: 'i' } },
    },
    ...populateChat,
  ]);
  // return the group
  return res.status(200).json(groups);
});
export { searchUsersController, searchChatsController, searchGroupsController };
