import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const surveySchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    unique: false,
    minlength: 4,
    maxlength: 50,
  },
  questions: [
    {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: false,
    },
  ],
  private: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
