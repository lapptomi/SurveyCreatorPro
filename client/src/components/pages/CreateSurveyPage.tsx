import React from 'react';
import {  Grid, Header, Segment } from 'semantic-ui-react';
import CreateSurveyForm from '../form/CreateSurveyForm';

const CreateSurveyPage: React.FC = () => {
  return (
    <Grid stackable>
      <Grid.Row color='black'>
        <Grid.Column width={16}>
        <Segment vertical inverted style={{
          paddingTop: 120,
        }}>
          <Header
            textAlign='center'
            as='h1'
            content='Create New Survey'
            size='huge'
            inverted
          />
        <CreateSurveyForm />
        </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateSurveyPage;