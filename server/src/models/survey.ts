import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const surveySchema: Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false, unique: false },
  questions: [{ type: String, required: true, unique: false }],
  private: { type: Boolean, required: true, unique: false },
});

surveySchema.plugin(uniqueValidator);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
