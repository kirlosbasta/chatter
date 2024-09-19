import { Router } from 'express';
import passport from 'passport';
import errorHandler from '../middlewares/error.middleware.js';
import statusController from '../controllers/status.controller.js';
import registerController from '../controllers/auth/register.controller.js';
import loginController from '../controllers/auth/login.controller.js';
import ChatsRouter from './chats.routes.js';
import UsersRouter from './user.routes.js';
import SearchRouter from './search.routes.js';
import MessagesRouter from './message.routes.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get(
  '/status',
  passport.authenticate('jwt', { session: false }),
  statusController,
);
router.use(ChatsRouter);
router.use(SearchRouter);
router.use(MessagesRouter);
router.use(UsersRouter);

router.use(errorHandler);

export default router;
