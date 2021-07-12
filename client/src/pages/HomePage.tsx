import React from 'react';
import { 
  Container, 
  Header, 
  Button, 
  Icon, 
  Segment,
  Grid
} from 'semantic-ui-react';
import img from '../style/header-image.png';

const HomePage: React.FC = () => {
  const loggedIn = window.localStorage.getItem('loggedUser') !== null;
  
  return (
    <Grid style={{ minHeight: '100vh' }} padded='horizontally'>
      <Grid.Row
        centered
        color='black'
        style={{
          paddingTop: '150px',
          height: '850px',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <Container text>
          <Header
            as='h1'
            content='SurveyCreatorPro'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginTop: '1em',
            }}
          />
          <Header
            as='h2'
            content='Best Online Survey Creator Available'
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
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
            as='a' 
            href={loggedIn ? '/surveys/create' : '/login'} 
            primary size='huge'
          >
            Get Started
            <Icon name='angle right' />
          </Button>
        </Container>
      </Grid.Row>

      <Grid.Row style={{ background: '#f7f7f7' }} centered>
        <Grid.Column
          style={{ padding: '100px' }}
          textAlign='center' 
          computer={8} 
          mobile={16}
        >
          <Segment vertical>
          <Header as='h1' style={{ fontSize: '3em' }}>
            What is SurveyCreatorPro?
          </Header>
            <p style={{ fontSize: '2em' }}>
              With SurveyCreatorPro you can create private or public surveys / research online.
            </p>
          </Segment>
        </Grid.Column>

        <Grid.Column
          style={{ padding: '100px' }}
          textAlign='center' 
          computer={8} 
          mobile={16}
        >
          <Segment vertical>
            <Header as='h1'style={{ fontSize: '3em' }}>
              Easy-To-Use
            </Header>
            <p style={{ fontSize: '2em' }}>
              SurveyCreatorPro is simple but powerful tool 
              and its very easy to get started with!
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row 
        style={{ 
          paddingTop: '10em',
          paddingBottom: '10em',
          background: '#1a86cb'
        }} 
        centered 
      >
        <Grid.Column width={16}>
          <Segment vertical textAlign='center'>
            <Container text>
              <Header
                inverted
                as='h1'
                content='So What Are You Waiting For?'
                style={{
                  fontSize: '3em',
                }}
              />
              <Button
                style={{ marginTop: 40 }}
                color='black'
                as='a' 
                href='/register'
                size='huge'
              >
              Click Here To Sign Up For Free
              <Icon name='arrow right' />
            </Button>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HomePage;