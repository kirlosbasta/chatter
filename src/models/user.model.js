import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Input is not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
  },
  {
    methods: {
      /**
       *
       * @param {string} password
       * @returns true if password is valid false otherwise
       */
      async isValidPassword(password) {
        return bcrypt.compare(password, this.password);
      },

      /**
       * Generate jwt token
       * @returns jwt token
       */
      generateToken() {
        const token = jwt.sign(
          { id: this._id, username: this.username },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        );
        return `Bearer ${token}`;
      },
      timestamps: true,
    },
  },
);

// Hash password befor saving when password is modified or new user is created
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
