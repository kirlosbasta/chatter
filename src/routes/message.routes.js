import { Router } from 'express';
import passport from 'passport';
import {
  getAllMessagesController,
  createMessageController,
  deleteMessageController,
} from '../controllers/message.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/messages/:chatId', getAllMessagesController);
router.post('/messages/:chatId', createMessageController);
router.delete('/messages/:chatId/:messageId', deleteMessageController);

export default router;
