import React from 'react';
import {
  Container,
  Header,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import '../style/HomePage.css';


const HomePage: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row centered className='mainpage-grid-row-1'>
        <Container text style={{ margin: 'auto' }}>
          <Header id='mainpage-grid-row-1-header-1'>SurveyCreatorPro</Header>
          <Header id='mainpage-grid-row-1-header-2'>Your number #1 tool for creating surveys</Header>
          <Header id='mainpage-grid-row-1-header-3'>Creating surveys online has never been so easy!</Header>
          <Button
            id='mainpage-grid-row-1-button'
            href={state.loggedIn ? '/surveys/create' : '/login'}
            primary
            size="huge"
          >
            Get Started
            <Icon name="angle right" />
          </Button>
        </Container>
      </Grid.Row>

      <Grid.Row className='mainpage-grid-row-2' centered>
        <Grid.Column className='mainpage-grid-row-2-col-1' width={16}>
          <Header id='mainpage-grid-row-2-header'>What is SurveyCreatorPro?</Header>
          <Header id='mainpage-grid-row-2-subheader'>
            Lorem ipsum dolor sit amet, consectetur adipisci elit,
            sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquid ex ea commodi consequat.
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row className='mainpage-grid-row-3'>
        <Grid.Column width={16} floated="right">
          <Container className='mainpage-grid-row-3-container'>
            <Header id='mainpage-grid-row-3-header'>
              How does it work?
            </Header>
            <Header id='mainpage-grid-row-3-subheader'>
              Lorem ipsum dolor sit amet, consectetur adipisci elit,
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquid ex ea commodi consequat.
            </Header>
          </Container>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row className='mainpage-grid-row-4' centered>
        <Container className='mainpage-grid-row-4-container' text>
          <Header id='mainpage-grid-row-4-header'>So What Are You Waiting For?</Header>
          <Button
            id="mainpage-grid-row-4-button"
            primary
            href="/register"
            size="huge"
          >
            Click Here To Sign Up
            <Icon name="angle right" />
          </Button>
        </Container>
      </Grid.Row>
    </Grid>
  );
};

export default HomePage;
