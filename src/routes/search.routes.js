import { Router } from 'express';
import passport from 'passport';
import {
  searchUsersController,
  searchChatsController,
  searchGroupsController,
} from '../controllers/search.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/search/users', searchUsersController);
router.get('/search/groups', searchGroupsController);
router.get('/search/chats', searchChatsController);

export default router;
