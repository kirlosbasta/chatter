import mongoose from 'mongoose';
import validator from 'validator';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.model.js';
import ChatModel from '../models/chat.model.js';
import ChatterError from '../utils/ChatterError.js';
import ChatMessageModel from '../models/message.model.js';

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
 * @description - get all user previos chats group or one to one
 */
const getAllChatsController = asyncHandler(async (req, res) => {
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
    ...populateChat,
  ]);
  res.status(200);
  return res.json(allChats);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get a chat between a user and a another user
 * by userId of the receiver and if no chat exist create new one
 */
const getOrCreateChatController = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;
  // check if the id is valid mongo id if not throw not found error
  if (!validator.isMongoId(receiverId)) {
    throw new ChatterError(404, 'User is Not Found');
  }
  const receiver = await UserModel.findById(receiverId);
  if (!receiver) {
    throw new ChatterError(404, 'User is Not Found');
  }
  if (receiver._id.toString() === req.user._id.toString()) {
    throw new ChatterError(400, "You can't chat with yourself");
  }
  // if vaild id look for an existing one to one chat with user and receiver
  const existingChat = await ChatModel.aggregate([
    {
      $match: {
        isGroupChat: false,
        $and: [
          {
            users: {
              $elemMatch: { $eq: new mongoose.Types.ObjectId(receiverId) },
            },
          },
          {
            users: {
              $elemMatch: { $eq: req.user._id },
            },
          },
        ],
      },
    },
    ...populateChat,
  ]);
  // if exists send the chat with 200 status
  if (existingChat.length) {
    return res.status(200).json(existingChat[0]);
  }
  // if doesn't exit create a chat and send it back with 201 status
  const newChat = await ChatModel.create({
    name: 'one to one chat',
    isGroupChat: false,
    users: [req.user._id, receiver._id],
    admin: req.user._id,
  });

  // populate users fields
  const populatedNewChat = await ChatModel.aggregate([
    {
      $match: {
        _id: newChat._id,
      },
    },
    ...populateChat,
  ]);
  return res.status(201).json(populatedNewChat[0]);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get a chat by chatId
 */
const getChatByIdController = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  if (!validator.isMongoId(chatId)) {
    throw new ChatterError(404, 'Chat is Not Found');
  }
  const [chat] = await ChatModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId),
      },
    },
    ...populateChat,
  ]);
  if (!chat) {
    throw new ChatterError(404, 'Chat is Not Found');
  }
  return res.status(200).json(chat);
});
/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - delete chat with all it's messages
 */
const deleteChatController = asyncHandler(async (req, res) => {
  // check if chat id is valid
  const { chatId } = req.params;
  if (!validator.isMongoId(chatId)) {
    throw new ChatterError(404, 'Chat is Not Found');
  }

  // check if the chat id exist
  const chat = await ChatModel.find({
    _id: new mongoose.Types.ObjectId(chatId),
    isGroupChat: false,
  });
  if (chat.length === 0) {
    throw new ChatterError(404, 'Chat is Not Found');
  }

  // check if the user is one of the users
  if (!chat[0].users.includes(req.user._id)) {
    throw new ChatterError(403, 'You are not part of the chat');
  }
  // delete all the messages connected to the chat id
  await ChatMessageModel.deleteMany({
    chat: chat[0]._id,
  });
  // delete the chat and send 200 status code
  await ChatModel.deleteOne({ _id: chat[0]._id });
  return res
    .status(200)
    .json({ success: true, message: 'Chat deleted successfuly' });
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - create a group chat
 */
const createGroupController = asyncHandler(async (req, res) => {
  // get the name from body
  const { name } = req.body;

  // if not exist throw bad requset
  if (!name) {
    throw new ChatterError(400, 'Missing Group name');
  }

  // check if the name already exist with user as admin
  const existingGroup = await ChatModel.findOne({
    name,
    isGroupChat: true,
    admin: req.user._id,
  });
  // if exist return 400 bad request
  if (existingGroup) {
    throw new ChatterError(400, 'You already has a group with this name');
  }
  // create the chat and add the user as admin and one of the users
  const newGroup = await ChatModel.create({
    name,
    isGroupChat: true,
    admin: req.user._id,
    users: [req.user._id],
  });
  const payload = await ChatModel.aggregate([
    {
      $match: {
        _id: newGroup._id,
      },
    },
    ...populateChat,
  ]);
  return res.status(201).json(payload[0]);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - add the user to a group chat
 */
const addSelfToGroupController = asyncHandler(async (req, res) => {
  // check if group id is valid mongo id
  const { groupId } = req.params;
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }
  // check if group exists
  const groupChat = await ChatModel.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
    isGroupChat: true,
  });
  if (!groupChat) throw new ChatterError(404, 'Group Not Found');
  // check if the user already in the group
  if (groupChat.users.includes(req.user._id)) {
    throw new ChatterError(400, 'You are already in the group');
  }
  // add the user to the group and return the populated group
  await ChatModel.findByIdAndUpdate(groupChat._id, {
    $push: { users: req.user._id },
  });
  const [payload] = await ChatModel.aggregate([
    {
      $match: { _id: groupChat._id },
    },
    ...populateChat,
  ]);
  return res.status(200).json(payload);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - leave a group chat
 */
const leaveGroupController = asyncHandler(async (req, res) => {
  // check if group id is valid mongo id
  const { groupId } = req.params;
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }
  // check if group exists
  const groupChat = await ChatModel.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
    isGroupChat: true,
  });
  if (!groupChat) throw new ChatterError(404, 'Group Not Found');

  // check if the user is in the group
  if (!groupChat.users.includes(req.user._id)) {
    throw new ChatterError(400, 'You are not in the group');
  }
  // check if the user is the admin
  if (groupChat.admin.toString() === req.user._id.toString()) {
    throw new ChatterError(400, 'You are the admin of the group');
  }
  // remove the user from the group
  await ChatModel.findByIdAndUpdate(groupChat._id, {
    $pull: { users: req.user._id },
  });
  const [payload] = await ChatModel.aggregate([
    {
      $match: { _id: groupChat._id },
    },
    ...populateChat,
  ]);
  return res.status(200).json(payload);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - delete a group chat
 */
const deleteGroupChatController = asyncHandler(async (req, res) => {
  // check if group id is valid mongo id
  const { groupId } = req.params;
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }

  // check if group exists
  const groupChat = await ChatModel.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
    isGroupChat: true,
  });

  if (!groupChat) throw new ChatterError(404, 'Group Not Found');
  // check if the user is the admin if not return 403 forbidden

  if (groupChat.admin.toString() !== req.user._id.toString()) {
    throw new ChatterError(403, 'You are not the admin of the group');
  }

  // if the user is the admin delete the group and all the messages
  await ChatMessageModel.deleteMany({ chat: groupChat._id });
  await ChatModel.deleteOne({ _id: groupChat._id });
  return res
    .status(200)
    .json({ success: true, message: 'Group deleted successfuly' });
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - remove a user from a group chat if i'm the admin
 */
const removeUserFromGroupChatController = asyncHandler(async (req, res) => {
  // check if group id is valid mongo id
  const { groupId, userId } = req.params;
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }
  if (!validator.isMongoId(userId)) {
    throw new ChatterError(404, 'User Not Found');
  }
  // check if group exists
  const groupChat = await ChatModel.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
    isGroupChat: true,
  });
  if (!groupChat) throw new ChatterError(404, 'Group Not Found');
  // check if the user exist
  const user = await UserModel.findById(userId);
  if (!user) throw new ChatterError(404, 'User Not Found');
  // check if the user is the admin if not throw 403 forbidden
  if (groupChat.admin.toString() !== req.user._id.toString()) {
    throw new ChatterError(403, 'You are not the admin of the group');
  }
  // check if the user is in the group
  if (!groupChat.users.includes(user._id)) {
    throw new ChatterError(400, 'User is not in the group');
  }
  // check if the userId to remove is the admin
  if (groupChat.admin.toString() === userId) {
    throw new ChatterError(400, 'You are the admin of the group');
  }
  // remove the user from the group
  await ChatModel.findByIdAndUpdate(groupChat._id, {
    $pull: { users: user._id },
  });
  // return the group
  const [payload] = await ChatModel.aggregate([
    {
      $match: { _id: groupChat._id },
    },
    ...populateChat,
  ]);
  return res.status(200).json(payload);
});

// get a group chat details
/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get a group chat details
 */
const getGroupChatController = asyncHandler(async (req, res) => {
  // check if group id is valid mongo id
  const { groupId } = req.params;
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }
  // check if group exists and populate the group and return it
  const [groupChat] = await ChatModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(groupId), isGroupChat: true },
    },
    ...populateChat,
  ]);
  if (!groupChat) throw new ChatterError(404, 'Group Not Found');
  return res.status(200).json(groupChat);
});

// add new user to a group chat as admin
/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - add new user to a group chat as admin
 */
const addUserToGroupChatController = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.params;
  // check if group id is valid mongo id
  if (!validator.isMongoId(groupId)) {
    throw new ChatterError(404, 'Group Not Found');
  }
  // check if user id is valid mongo id
  if (!validator.isMongoId(userId)) {
    throw new ChatterError(404, 'User Not Found');
  }
  // check if group exists
  const groupChat = await ChatModel.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
    isGroupChat: true,
  });
  if (!groupChat) throw new ChatterError(404, 'Group Not Found');
  // check if the user exists
  const user = await UserModel.findById(userId);
  if (!user) throw new ChatterError(404, 'User Not Found');
  // check if the user is the admin
  if (groupChat.admin.toString() !== req.user._id.toString()) {
    throw new ChatterError(403, 'You are not the admin of the group');
  }
  // check if the user is in the group
  if (groupChat.users.includes(user._id)) {
    throw new ChatterError(400, 'User is already in the group');
  }
  // check if the user to add is not the admin
  if (groupChat.admin.toString() === userId) {
    throw new ChatterError(400, 'User is the admin of the group');
  }
  // add the user to the group
  await ChatModel.findByIdAndUpdate(groupChat._id, {
    $push: { users: user._id },
  });
  // return the group
  const [payload] = await ChatModel.aggregate([
    {
      $match: {
        _id: groupChat._id,
      },
    },
    ...populateChat,
  ]);
  return res.status(200).json(payload);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - Get all group chats available
 */
const getGroupsController = asyncHandler(async (req, res) => {
  const groups = await ChatModel.aggregate([
    {
      $match: {
        isGroupChat: true,
      },
    },
    ...populateChat,
  ]);
  return res.status(200).json(groups);
});

export {
  deleteChatController,
  leaveGroupController,
  createGroupController,
  getGroupsController,
  getAllChatsController,
  getChatByIdController,
  getGroupChatController,
  addSelfToGroupController,
  deleteGroupChatController,
  getOrCreateChatController,
  addUserToGroupChatController,
  removeUserFromGroupChatController,
};
