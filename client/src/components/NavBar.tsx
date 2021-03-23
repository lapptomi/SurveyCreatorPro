
import React from 'react';
import { Visibility, Menu, Container, Button } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  const fixed = false;
  
  const loggedIn = window.localStorage.length > 0;

  return (
    <Visibility once={true}>
      <Menu
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'
      >
      <Container>
        <Menu.Item as='a' href='/' active>
          Home
        </Menu.Item>
        <Menu.Item as='a' href='/'>Path 2</Menu.Item>
        <Menu.Item as='a'>Path 3</Menu.Item>
        <Menu.Item as='a'>Path 4</Menu.Item>
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
            href={loggedIn ? '/logout' : '/register'}
            inverted={fixed} 
            primary={fixed} 
            style={{ marginLeft: '0.5em' }}
          >
            {loggedIn ? 'Log out' : 'Sign Up'}
          </Button>
        </Menu.Item>
      </Container>
      </Menu>
    </Visibility>
  );
};

export default NavBar;