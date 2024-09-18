import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true },
);

const ChatMessageModel = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessageModel;
