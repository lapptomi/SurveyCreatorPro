import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

export default User;
