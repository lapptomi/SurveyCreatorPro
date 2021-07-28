import React from 'react';
import {
  Button,
  Header,
  Icon,
  List,
} from 'semantic-ui-react';

interface Props {
  questions: Array<string>;
  handleRemove(question: string): void;
}

const QuestionList: React.FC<Props> = ({ questions: questionObjects, handleRemove }) => {
  if (questionObjects.length === 0) {
    return (
      <Header as="h2" subheader="No questions added yet..." />
    );
  }

  return (
    <List divided verticalAlign="middle">
      {Object.values(questionObjects).map((question, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={index} style={{ padding: '10px' }}>
          <List.Content floated="right">
            <Button color="blue" onClick={(): void => window.alert('Edit button not working yet')}>
              Edit
            </Button>
            <Button color="red" onClick={(): void => handleRemove(question)}>
              Remove
            </Button>
          </List.Content>
          <Icon name="caret right" size="big" color="grey" />
          <List.Content>
            <Header
              as="h3"
              content={`Question ${index + 1}:`}
              subheader={question}
            />
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default QuestionList;
