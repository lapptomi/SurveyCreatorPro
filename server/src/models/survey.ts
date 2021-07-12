import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const surveySchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  questions: [{
    question: {
      type: String,
      required: true,
      unique: false,
    },
    choises: [{
      type: String,
      required: true,
    }],
  }],
  private: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
