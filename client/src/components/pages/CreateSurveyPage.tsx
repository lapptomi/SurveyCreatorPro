import React from 'react';
import {  Grid, Header, Segment } from 'semantic-ui-react';
import CreateSurveyForm from '../form/CreateSurveyForm';


const CreateSurveyPage: React.FC = () => {
  return (
    <Segment style={{ minHeight: '100vh', paddingTop: '100px' }} inverted vertical>
      <Header
        textAlign='center'
        as='h1'
        content='Create New Survey'
        size='huge'
      />
      <Grid centered>
        <Grid.Row style={{ padding: '50px' }} centered>
          
          <Grid.Column width={16} style={{  maxWidth: 600 }}>
            <Segment textAlign={'center'} inverted>
              <CreateSurveyForm />
            </Segment>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default CreateSurveyPage;