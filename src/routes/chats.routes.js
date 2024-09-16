import { Router } from 'express';
import passport from 'passport';
import { getAllChatsController } from '../controllers/chat.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/chats', getAllChatsController);

export default router;
