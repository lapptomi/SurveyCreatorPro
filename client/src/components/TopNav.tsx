import React from 'react';
import loginService from '../services/login';
import { 
  Menu, 
  Container, 
  Button, 
  Icon,
  Header
 } from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import { Link } from 'react-router-dom';

const LoggedInTopNav: React.FC = () => (
    <Container>
      <Menu.Item>
        <Link to="/">
          <Header inverted textAlign='center'>
            SurveyCreatorPro
          </Header>
        </Link>
      </Menu.Item>

      
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

      <Menu.Menu position='right'>

        <Menu.Item>
          <Link to="/profile">
            <Button color='black'>
              Profile
            </Button>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/logout">
            <Button
              color='black'
              as='a'
              onClick={loginService.logout}
            >
              Log out
            </Button>
          </Link>
        </Menu.Item>

    </Menu.Menu>
  </Container>
);

const LoggedOutTopNav: React.FC = () => (
  <Container>
    <Menu.Item>
      <Link to="/">
        <Header inverted textAlign='center'>
          SurveyCreatorPro
        </Header>
      </Link>
    </Menu.Item>

    <Menu.Menu position='right'>

      <Menu.Item>
        <Link to="/login">
          <Button color='black'>
            Log In
          </Button>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/register">
          <Button primary>
            Sign Up
          </Button>
        </Link>
      </Menu.Item>

    </Menu.Menu>
  </Container>
);

const TopNav: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Menu size='large' secondary inverted color='black'>
      {state.isLoggedIn ? <LoggedInTopNav /> : <LoggedOutTopNav />}
    </Menu>
  );
};

export default TopNav;