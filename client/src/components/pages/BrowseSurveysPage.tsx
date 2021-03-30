import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';
import SurveyList from '../SurveyList';

const BrowseSurveysPage: React.FC = () => {
  return (
    <Segment
      inverted
      textAlign='left'
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical
    >
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
    </Segment>
  );
};

export default BrowseSurveysPage;