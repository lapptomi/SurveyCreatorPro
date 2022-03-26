import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Grid } from 'semantic-ui-react';
import SurveyList from '../components/SurveyList';
import '../style/BrowseSurveysPage.css';

const BrowseSurveysPage: React.FC = () => (
  <Grid className='grid'>
    <Grid.Row className='grid-row-1' color="black">
      <Container className='grid-row-1-container'>
        <Header id='grid-row-1-header-1'>Browse Public Surveys</Header>
        <Header id='grid-row-1-header-2'>Here you can browse and answer to public surveys that other people have created</Header>
        <Header id='grid-row-1-header-3'>
          You can also create new survey
          <Link to="/surveys/create"><span> Here</span></Link>
        </Header>
        <SurveyList />
      </Container>
    </Grid.Row>
  </Grid>
);

export default BrowseSurveysPage;
