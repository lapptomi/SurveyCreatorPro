import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import SurveyList from '../SurveyList';

const BrowseSurveysPage: React.FC = () => {
  return (
    <Grid textAlign='center' style={{ minHeight: '100vh' }} verticalAlign='middle'>
      <Grid.Row color='black'>
        <Container text>
          <Header
            as='h1'
            content='Browse Public Surveys'
            inverted
            style={{
              fontSize: '3em',
              fontWeight: 'normal',
              marginTop: '1.5em',
            }}
          />
          <Header
            as='h2'
            content='Here you can browse and answer to public surveys that other people have created'
            inverted
            style={{
              fontSize: '1.4em',
              fontWeight: 'normal',
              marginTop: '1em',
            }}
          />
          <Header
            inverted
            style={{
              fontSize: '1.2em',
              fontWeight: 'normal',
              marginTop: '1.5em',
              marginBottom: '2em',
            }}
          >
          <p>You can also create new survey 
            <a href='/surveys/create'> Here</a>
          </p>
          </Header>
        <SurveyList />
        </Container>
      </Grid.Row>
    </Grid>
  );
};

export default BrowseSurveysPage;