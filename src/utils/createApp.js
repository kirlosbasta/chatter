import cors from 'cors';
import express from 'express';
import passport from 'passport';
import { Server } from 'socket.io';
import { createServer } from 'http';
import router from '../routes/index.js';
import connectDB from './database.js';
import { initSocket } from '../socket/socket.js';
import '../passport/jwt.stratgy.js';

function createApp() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  app.set('io', io);

  connectDB();
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());

  app.use('/api/v1', router);

  initSocket(io);

  // important to listen to httpServer instead of app because of socket.io
  return httpServer;
}

export default createApp;
