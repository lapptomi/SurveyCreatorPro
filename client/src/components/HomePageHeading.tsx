import React from 'react';
import { 
  Container, 
  Header, 
  Button, 
  Icon, 
  Segment
} from 'semantic-ui-react';

const HomePageHeading: React.FC = () => (
  <Segment
    inverted
    textAlign='center'
    style={{ minHeight: 700, padding: '1em 0em' }}
    vertical
  >
    <Container text>
      <Header
        as='h1'
        content='SurveyMakerPro'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Best Online Survey Creator On The Internet'
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Header
        content='"Creating surveys online has never been so easy!"'
        inverted
        style={{
          fontSize: '1.2em',
          fontWeight: 'normal',
          marginTop: '1.5em',
          marginBottom: '2em',
        }}
      />
      <Button as='a' href='/login' primary size='huge'>
        Get Started
        <Icon name='angle right' />
      </Button>
    </Container>  
  </Segment>
);

export default HomePageHeading;