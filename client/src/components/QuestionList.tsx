import React from 'react';
import {
  Button,
  Header,
  Icon,
  List,
} from 'semantic-ui-react';
import { IQuestion } from '../types';

interface Props {
  questionObjects: Array<IQuestion>;
  handleRemove(question: string): void;
}

const QuestionList: React.FC<Props> = ({ questionObjects, handleRemove }) => {
  if (questionObjects.length === 0) {
    return (
      <Header as="h2" subheader="No questions added yet..." />
    );
  }

  return (
    <List divided verticalAlign="middle">
      {Object.values(questionObjects).map((questionObj, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={index} style={{ padding: '10px' }}>
          <List.Content floated="right">
            <Button color="blue" onClick={() => window.alert('Edit button not working yet')}>
              Edit
            </Button>
            <Button color="red" onClick={() => handleRemove(questionObj.question)}>
              Remove
            </Button>
          </List.Content>
          <Icon name="caret right" size="big" color="grey" />
          <List.Content>
            <Header
              as="h3"
              content={`Question ${index + 1}:`}
              subheader={questionObj.question}
            />
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default QuestionList;
