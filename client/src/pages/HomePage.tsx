import React from 'react';
import {
  Container,
  Header,
  Button,
  Icon,
  Segment,
  Grid,
  Image,
} from 'semantic-ui-react';
import '../style/index.css';

import img2 from '../style/img2.png';
import img3 from '../style/img3.png';
import { useGlobalState } from '../state/state';

const HomePage: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row
        centered
        color="black"
        style={{
          paddingTop: '150px',
          height: '850px',
          backgroundImage: `url(${img2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <Container text>
          <Header
            content="SurveyCreatorPro"
            style={{
              fontSize: '5em',
              fontWeight: 'bold',
              marginTop: '1em',
            }}
          />
          <Header
            content="Your number #1 tool for creating surveys"
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
            }}
          />
          <Header
            content='"Creating surveys online has never been so easy!"'
            style={{
              fontSize: '1.2em',
              fontWeight: 'normal',
              marginTop: '1.5em',
              marginBottom: '2em',
            }}
          />
          <Button
            as="a"
            href={state.loggedIn ? '/surveys/create' : '/login'}
            primary
            size="huge"
            style={{ marginTop: '30px', width: '300px' }}
          >
            Get Started
            <Icon name="angle right" />
          </Button>
        </Container>
      </Grid.Row>

      <Grid.Row
        centered
        style={{ background: '#0E2C47' }}
        verticalAlign="middle"
      >
        <Grid.Column
          style={{ padding: '170px', maxWidth: '1000px' }}
          textAlign="left"
          computer={12}
          mobile={16}
        >
          <Container>
            <Header style={{ fontSize: '4.5em' }} inverted>
              What is SurveyCreatorPro?
            </Header>
            <Header style={{ fontSize: '2em', opacity: '0.8' }} inverted>
              Lorem ipsum dolor sit amet, consectetur adipisci elit,
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquid ex ea commodi consequat.
            </Header>
          </Container>
        </Grid.Column>

        <Grid.Column
          className="hidden-mobile" // image will be hidden with mobile resolutions
          style={{ marginTop: '50px' }}
          computer={4}
          mobile={16}
        >
          <Image floated="right" src={img3} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row style={{ background: 'rgb(75 64 138)' }}>
        <Container
          textAlign="right"
          style={{ padding: '200px 100px 200px 100px', maxWidth: '1000px' }}
        >
          <Header style={{ fontSize: '5em' }} inverted>
            How does it work?
          </Header>
          <Header as="h3" style={{ fontSize: '2em', opacity: '0.8' }} inverted>
            Lorem ipsum dolor sit amet, consectetur adipisci elit,
            sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquid ex ea commodi consequat.
          </Header>
        </Container>
      </Grid.Row>

      <Grid.Row
        centered
        verticalAlign="middle"
        style={{
          paddingTop: '250px',
          paddingBottom: '250px',
          backgroundImage: `url(${img2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <Segment vertical textAlign="center">
          <Container text>
            <Header
              content="So What Are You Waiting For?"
              style={{ fontSize: '3em' }}
            />
            <Button
              style={{ marginTop: '40px' }}
              color="blue"
              as="a"
              href="/register"
              size="huge"
            >
              Click Here To Sign Up
              <Icon name="angle right" />
            </Button>
          </Container>
        </Segment>
      </Grid.Row>
    </Grid>
  );
};

export default HomePage;
