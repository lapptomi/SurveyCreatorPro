import React from 'react';
import { Segment, Container } from 'semantic-ui-react';
import CreateSurveyForm from './form/CreateSurveyForm';

const CreateSurveyPage: React.FC = () => {
  return (
    <Segment
      inverted
      textAlign='left'
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical
    >
    <Container text>
      <CreateSurveyForm />
    </Container>
  </Segment>
  );
};

export default CreateSurveyPage;