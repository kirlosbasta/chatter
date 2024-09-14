import express from 'express';
import passport from 'passport';
import router from '../routes/index.js';
import connectDB from './database.js';
import '../passport/jwt.stratgy.js';

function createApp() {
  const app = express();

  connectDB();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());

  app.use('/api/v1', router);

  return app;
}

export default createApp;
