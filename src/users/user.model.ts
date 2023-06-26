/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
export interface User extends Document {
  name: string;
  isActive: boolean;
  password: string;
  course: string;
  email: string;
  type: string;
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  password: { type: String, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
});
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
