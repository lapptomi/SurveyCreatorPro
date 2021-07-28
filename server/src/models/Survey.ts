import mongoose, { Document, Schema } from 'mongoose';
import { ISurvey, SchemaName } from '../types';

const surveySchema = new Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SchemaName.User,
  },
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
  questions: [{
    questionNumber: {
      type: Number,
      required: true,
      unique: false,
    },
    question: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: false,
    },
  }],
  private: {
    type: Boolean,
    required: true,
    unique: false,
  },
  responses: [{
    respondent: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: SchemaName.User,
      minlength: 3,
    },
    answers: [{
      questionNumber: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: false,
      },
      answer: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    }],
  }],
});

const Survey = mongoose.model<ISurvey & Document>(SchemaName.Survey, surveySchema);

export default Survey;
