import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    staus: {
      type: String,
      enum: ['inProgress', 'block'],
      default: 'inProgress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRound),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const isUserExist = await User.findOne({ id });
  return isUserExist;
};

userSchema.statics.isPassowrdMatched = async function (id, plainPassword) {
  const hashePassowrd = await User.findOne({ id }, { password: 1 });
  return await bcrypt.compare(plainPassword, hashePassowrd?.password as string);
};

export const User = model<IUser, UserModel>('user', userSchema);
