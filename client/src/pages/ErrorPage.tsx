import { Button, Grid, Header } from 'semantic-ui-react';
import React from 'react';
import '../style/ErrorPage.css';

const ErrorPage: React.FC = () => (
  <Grid>
    <Grid.Row className='grid-row-1' centered>
      <Grid.Column textAlign="center">
        <Header id='grid-row-1-header'>Oops!</Header>
          <Header id='grid-row-1-header-content'> 404 - Page Not Found :(</Header>
          <Header id='grid-row-1-subheader'>Something went wrong or the page does not exist...</Header>
        <Button
          id='grid-row-1-button'
          primary
          onClick={(): void => window.location.replace('/')}
        >
          Go Back To Homepage
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ErrorPage;
