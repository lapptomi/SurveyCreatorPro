import mongoose, { Document, Schema } from 'mongoose';
import { IUser, SchemaName } from '../types';

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

const User = mongoose.model<IUser & Document>(SchemaName.User, userSchema);

export default User;
