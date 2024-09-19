import validator from 'validator';
import asyncHandler from 'express-async-handler';
import ChatModel from '../models/chat.model.js';
import ChatterError from '../utils/ChatterError.js';
import ChatMessageModel from '../models/message.model.js';
import { emitSocketEvent } from '../socket/socket.js';

/**
 * @description - populate the sender field of the message
 */
const populateSender = [
  {
    $lookup: {
      from: 'users',
      localField: 'sender',
      foreignField: '_id',
      as: 'sender',
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
    $addFields: { sender: { $first: '$sender' } },
  },
];

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - get all messages of a chat by id
 */
const getAllMessagesController = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  // check if chatId is valid mongo id
  if (!validator.isMongoId(chatId)) {
    throw new ChatterError(404, 'Chat is Not Found');
  }
  // check if chat exist
  const chat = await ChatModel.findById(chatId);
  if (!chat) throw new ChatterError(404, 'Chat is Not Found');
  // check if the user is part of the chat
  if (!chat.users.includes(req.user._id)) {
    throw new ChatterError(403, 'User is Not in the Chat');
  }
  // return the messages populated in ascending order the lastest message is at the end
  const payload = await ChatMessageModel.aggregate([
    {
      $match: { chat: chat._id },
    },
    ...populateSender,
    {
      $sort: { createdAt: 1 },
    },
    {
      $project: {
        __v: 0,
        chat: 0,
      },
    },
  ]);
  return res.status(200).json(payload);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - create a message
 */
const createMessageController = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  // check if chatId is valid mongo id
  if (!validator.isMongoId(chatId)) {
    throw new ChatterError(404, 'Chat is Not Found');
  }

  // check if content is not empty
  if (!content) {
    throw new ChatterError(400, 'Message Content is Missing');
  }
  // check if chat exist
  const chat = await ChatModel.findById(chatId);
  if (!chat) throw new ChatterError(404, 'Chat is Not Found');

  // check if the user is part of the chat
  if (!chat.users.includes(req.user._id)) {
    throw new ChatterError(403, 'User is Not in the Chat');
  }

  // create the message
  const message = await ChatMessageModel.create({
    chat: chat._id,
    sender: req.user._id,
    content,
  });

  // update the chat last message
  await ChatModel.findByIdAndUpdate(chat._id, {
    lastMessage: message._id,
  });
  // return the message
  emitSocketEvent(req, chatId, 'receive-message', message);
  return res.status(201).json(message);
});

/**
 * @param {import('express').Request} req - request object
 * @param {import('express').Response} res - response object
 *
 * @description - delete a message
 */
const deleteMessageController = asyncHandler(async (req, res) => {
  const { chatId, messageId } = req.params;

  // check if chatId is valid mongo id
  if (!validator.isMongoId(chatId)) {
    throw new ChatterError(404, 'Chat is Not Found');
  }

  // check if messageId is valid mongo id
  if (!validator.isMongoId(messageId)) {
    throw new ChatterError(404, 'Message is Not Found');
  }

  // check if chat exist
  const chat = await ChatModel.findById(chatId);
  if (!chat) throw new ChatterError(404, 'Chat is Not Found');

  // check if message exist
  const message = await ChatMessageModel.findById(messageId);
  if (!message) throw new ChatterError(404, 'Message is Not Found');

  // check if the user is part of the chat
  if (!chat.users.includes(req.user._id)) {
    throw new ChatterError(403, 'User is Not in the Chat');
  }

  // check if the message is part of the chat
  if (!message.chat.equals(chat._id)) {
    throw new ChatterError(404, 'Message is Not in the Chat');
  }

  // delete the message
  await ChatMessageModel.findByIdAndDelete(message._id);

  // update the chat last message if the deleted message is the last message
  if (chat.lastMessage.equals(message._id)) {
    const [lastMessage] = await ChatMessageModel.find({
      chat: chat._id,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    await ChatModel.findByIdAndUpdate(chat._id, {
      lastMessage: lastMessage._id,
    });
  }
  // return 200 status
  return res.status(200).json({ success: true, message: 'Message Deleted' });
});
export {
  getAllMessagesController,
  createMessageController,
  deleteMessageController,
};
