import React from 'react';
import loginService from '../services/login';
import { 
  Menu, 
  Container, 
  Button, 
  Icon,
  Grid
 } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  const loggedIn = window.localStorage.getItem('loggedUser') != null;

  return (
    <Grid padded='horizontally'>
      <Grid.Row color='black'>
        <Grid.Column width={16}>
          <Menu
            inverted
            size='large'
          >
          <Container>
            <Menu.Item as='a' href='/'>
              <Icon name={'home'} />
            </Menu.Item>

            {loggedIn && 
            <>
              <Menu.Item
                as='a' 
                href={'/surveys/create'}
                active={window.location.pathname === '/surveys/create'}
              >
              <Icon name={'edit outline'} /> Create Survey
              </Menu.Item>
              
              <Menu.Item 
                as='a'
                href={'/surveys/browse'}
                active={window.location.pathname === '/surveys/browse'}
              >
              <Icon name={'list ul'} /> Browse Surveys
              </Menu.Item>
            </>}
            
            <Menu.Item position='right'>
              <Button 
                color='black'
                as='a'
                href={loggedIn ? '/profile' : '/login'}
              >
                {loggedIn ? 'Profile' : 'Log in'}
              </Button>
              <Button
                color='black'
                as='a'
                onClick={loggedIn 
                  ? loginService.logout 
                  : () => window.location.replace('/register')
                }
                style={{ marginLeft: '0.5em' }}
              >
                {loggedIn ? 'Log out' : 'Sign Up'}
              </Button>
            </Menu.Item>
          </Container>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NavBar;