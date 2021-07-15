import mongoose, { Schema, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserSchema extends Document {
  id: string;
  email: string;
  password: string;
}

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

const User = mongoose.model<IUserSchema>('User', userSchema);

export default User;
