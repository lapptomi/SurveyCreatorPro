import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { Gender } from '../../types';

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  gender: { type: Gender, required: true, unique: false },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;
