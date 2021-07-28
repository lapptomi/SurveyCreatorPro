import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUser & Document>(SchemaName.User, userSchema);

export default User;
