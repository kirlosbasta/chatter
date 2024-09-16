import { Router } from 'express';
import passport from 'passport';
import {
  getAllChatsController,
  getOrCreateChatController,
  deleteChatController,
  createGroupController,
  addSelfToGroupController,
  leaveGroupController,
  deleteGroupChatController,
  removeUserFromGroupChatController,
  getGroupChatController,
  addUserToGroupChatController,
} from '../controllers/chat.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/chats', getAllChatsController);
router.get('/chats/:receiverId', getOrCreateChatController);
router.delete('/chats/:chatId', deleteChatController);
router.post('/groups', createGroupController);
router.post('/groups/:groupId', addSelfToGroupController);
router.delete('/groups/:groupId/leave', leaveGroupController);
router.delete('/groups/:groupId', deleteGroupChatController);
router.delete('/groups/:groupId/:userId', removeUserFromGroupChatController);
router.get('/groups/:groupId', getGroupChatController);
router.post('/groups/:groupId/:userId', addUserToGroupChatController);

export default router;
