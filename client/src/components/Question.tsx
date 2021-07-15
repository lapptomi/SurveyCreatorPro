import React from 'react';
import { Segment } from 'semantic-ui-react';
import { IQuestion } from '../types';

interface Props {
  question: IQuestion;
}

const Question: React.FC<Props> = ({ question }) => {
  console.log('asd');

  return (
    <Segment>
      <h1>{question.question}</h1>
    </Segment>
  );
};

export default Question;