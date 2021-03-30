import React from 'react';
import {  Grid, Header, Segment } from 'semantic-ui-react';
import CreateSurveyForm from './form/CreateSurveyForm';

const CreateSurveyPage: React.FC = () => {
  return (
    <Segment inverted style={{
      paddingTop: 120,
    }}>
      <Grid stackable>
        <Grid.Row >
          <Grid.Column width={16}>
          <Header
            textAlign='center'
            as='h1'
            content='Create New Survey'
            size='huge'
            inverted
          />
        </Grid.Column>
        </Grid.Row>
      </Grid>        
      <CreateSurveyForm />
    </Segment>
  );
};

export default CreateSurveyPage;