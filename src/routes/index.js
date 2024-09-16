import { Router } from 'express';
import passport from 'passport';
import errorHandler from '../middlewares/error.middleware.js';
import statusController from '../controllers/status.controller.js';
import registerController from '../controllers/auth/register.controller.js';
import loginController from '../controllers/auth/login.controller.js';
import ChatsRouter from './chats.routes.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get(
  '/status',
  passport.authenticate('jwt', { session: false }),
  statusController,
);
router.use(ChatsRouter);

router.use(errorHandler);

export default router;
