import { Button, Grid, Header } from 'semantic-ui-react';
import React from 'react';
import img from '../style/img2.png';

const ErrorPage: React.FC = () => (
  <Grid>
    <Grid.Row
      centered
      style={{
        minHeight: '1000px',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <Grid.Column width={16} textAlign="center">
        <Header style={{ paddingTop: '200px', fontSize: '150px' }}>
          Oops!
        </Header>
        <Header>
          <Header.Content style={{ fontSize: '60px', marginTop: '50px' }}>
            404 - Page Not Found :(
          </Header.Content>
          <Header.Subheader style={{ paddingTop: '40px', fontSize: '30px' }}>
            Something went wrong or the page does not exist...
          </Header.Subheader>
        </Header>
        <Button
          primary
          style={{ marginTop: '20px' }}
          onClick={() => window.location.replace('/')}
        >
          GO TO HOMEPAGE
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ErrorPage;
