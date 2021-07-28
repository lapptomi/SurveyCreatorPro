import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Grid } from 'semantic-ui-react';
import SurveyList from '../components/SurveyList';
import img from '../style/img2.png';

const BrowseSurveysPage: React.FC = () => (
  <Grid
    textAlign="center"
    style={{ minHeight: '100vh' }}
    verticalAlign="middle"
  >
    <Grid.Row
      color="black"
      style={{
        minHeight: '1200px',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <Container style={{ marginTop: '70px' }}>
        <Header
          as="h1"
          content="Browse Public Surveys"
          style={{ fontSize: '3em', fontWeight: 'normal' }}
        />
        <Header
          as="h2"
          content="Here you can browse and answer to public surveys that other people have created"
          style={{ fontWeight: 'normal' }}
        />
        <Header
          as="h2"
          style={{ fontWeight: 'normal' }}
        >
          You can also create new survey
          <Link to="/surveys/create">
            <span> Here</span>
          </Link>
        </Header>
        <SurveyList />
      </Container>
    </Grid.Row>
  </Grid>
);

export default BrowseSurveysPage;
