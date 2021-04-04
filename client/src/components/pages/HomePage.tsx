import React from 'react';
import { 
  Container, 
  Header, 
  Button, 
  Icon, 
  Segment,
  Grid
} from 'semantic-ui-react';

const HomePage: React.FC = () => {
  const loggedIn = window.localStorage.getItem('loggedUser') !== null;
  
  return (
    <Grid style={{ minHeight: '100vh' }} padded='horizontally'>
      <Grid.Row centered color='blue'>
        <Segment
          vertical
          textAlign='center'
        >
        <Container text>
          <Header
            inverted
            as='h1'
            content='SurveyMakerPro'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginTop: '2em',
            }}
          />
          <Header
            inverted
            as='h2'
            content='Best Online Survey Creator Available'
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
            }}
          />
          <Header
            inverted
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
            style={{ marginBottom: '2em' }}
          >
            Get Started
            <Icon name='angle right' />
          </Button>
        </Container>
        </Segment>
      </Grid.Row>

      <Grid.Row color='black' style={{ padding: '130px' }}>
        <Grid.Column textAlign='center' computer={8} mobile={16}>
          <Segment vertical inverted textAlign='left'  stacked>
          <Header as='h1' style={{ fontSize: '2.3em' }}>
            <Icon name='question' size='tiny'/>What is SurveyMakerPro?
          </Header>
            <p style={{ fontSize: '1.33em' }}>
              SurveyMakerPro is a tool for making surveys / research online easily,
              where other people can answer.
            </p>
          </Segment>
        </Grid.Column>

        <Grid.Column textAlign='center' computer={8} mobile={16}>
          <Segment vertical inverted textAlign='left'  stacked>
            <Header as='h1'style={{ fontSize: '2.5em' }}>
              <Icon name='puzzle' /> Easy-To-Use
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              SurveyMakerPro is simple but powerful tool 
              and its very easy to get started with!
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row 
        style={{ 
          paddingTop: '10em',
          paddingBottom: '10em',
          backgroundImage: `url("https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2160&q=80")` 
        }} 
        centered 
        color='black'
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
                color='blue'
                as='a' 
                href={loggedIn ? '/surveys/create' : '/login'} 
                size='huge'
              >
              Click Here To Sign Up For Free
              <Icon name='angle right' />
            </Button>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default HomePage;