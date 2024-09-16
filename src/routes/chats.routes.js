import { Router } from 'express';
import passport from 'passport';
import {
  getAllChatsController,
  getOrCreateChatController,
  deleteChatController,
  createGroupController,
  addUserToGroupController,
} from '../controllers/chat.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/chats', getAllChatsController);
router.get('/chats/:receiverId', getOrCreateChatController);
router.delete('/chats/:chatId', deleteChatController);
router.post('/groups', createGroupController);
router.post('/groups/:groupId', addUserToGroupController);

export default router;
