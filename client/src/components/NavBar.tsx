
import React from 'react';
import { Visibility, Menu, Container, Button } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  const fixed = false;  
  
  return (
    <Visibility once={true}>
      <Menu
        inverted={!fixed}
        pointing={!fixed}
        secondary={!fixed}
        size='large'
      >
      <Container>
        <Menu.Item as='a' active>
          Home
        </Menu.Item>
        <Menu.Item as='a'>Path 2</Menu.Item>
        <Menu.Item as='a'>Path 3</Menu.Item>
        <Menu.Item as='a'>Path 4</Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' inverted={!fixed}>
            Log in
          </Button>
          <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
      </Menu>
    </Visibility>
  );
};

export default NavBar;