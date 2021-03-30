import React from 'react';
import loginService from '../services/login';
import { 
  Visibility, 
  Menu, 
  Container, 
  Button, 
  Icon,
  Segment
 } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  const fixed = false;
  const loggedIn = window.localStorage.getItem('loggedUser') != null;

  return (
    <Visibility once={!true}>
      <Segment inverted vertical>
        <Menu
          inverted={!fixed}
          secondary={!fixed}
          size='large'
        >
        <Container>
          <Menu.Item 
            color='blue'
            as='a' 
            href='/' 
            active={
              loggedIn &&
              window.location.pathname !== '/surveys/create' && 
              window.location.pathname !== '/surveys/browse'
            }
          >
          <Icon name={'home'} /> Home
          </Menu.Item>

          {loggedIn && 
          <>
            <Menu.Item
              color='blue'
              as='a' 
              href={'/surveys/create'}
              active={window.location.pathname === '/surveys/create'}
            >
            <Icon name={'edit outline'} /> Create Survey
            </Menu.Item>
            
            <Menu.Item 
              color='blue'
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
              inverted={fixed}
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
              inverted={fixed} 
              primary={fixed} 
              style={{ marginLeft: '0.5em' }}
            >
              {loggedIn ? 'Log out' : 'Sign Up'}
            </Button>
          </Menu.Item>
        </Container>
        </Menu>
      </Segment>
    </Visibility>
  );
};

export default NavBar;