import passport from 'passport';
import { Strategy as JwtStratgy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';
import ChatterError from '../utils/ChatterError.js';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       throw new ChatterError(404, 'User not found')
//     }
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

passport.use(
  new JwtStratgy(options, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (!user) {
        throw new ChatterError(404, 'User not found');
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
