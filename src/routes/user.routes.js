import { Router } from 'express';
import passport from 'passport';
import { getUsersController } from '../controllers/user.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/users', getUsersController);

export default router;
