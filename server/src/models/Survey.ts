import mongoose, { Document, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IQuestion, Response, SchemaName } from '../types';

export interface ISurveySchema extends Document {
  creatorId: string;
  title: string;
  description: string;
  questions: Array<IQuestion>;
  private: boolean;
  responses?: Array<Response>;
}

const surveySchema: Schema = new mongoose.Schema({
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

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model(SchemaName.Survey, surveySchema);

export default Survey;
