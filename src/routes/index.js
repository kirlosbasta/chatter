import { Router } from 'express';
import passport from 'passport';
import errorHandler from '../middlewares/error.middleware.js';
import statusController from '../controllers/status.controller.js';
import registerController from '../controllers/register.controller.js';
import loginController from '../controllers/login.controller.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get(
  '/status',
  passport.authenticate('jwt', { session: false }),
  statusController,
);

router.use(errorHandler);

export default router;
