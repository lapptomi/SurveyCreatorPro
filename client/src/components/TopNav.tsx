import React from 'react';
import {
  Menu,
  Button,
  Icon,
  Header,
  Grid,
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import loginService from '../services/login';
import { useGlobalState } from '../state/state';

const LoggedInTopNav: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Menu.Item
        id="topnav-browse-surveys-button"
        active={location.pathname === '/surveys/browse'}
      >
        <Link to="/surveys/browse">
          <Icon name="list ul" />
          <b> Browse Surveys</b>
        </Link>
      </Menu.Item>
      <Menu.Item
        id="topnav-create-survey-button"
        active={location.pathname === '/surveys/create'}
      >
        <Link to="/surveys/create">
          <Icon name="edit outline" />
          <b> Create Survey</b>
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item active={location.pathname === '/profile'}>
          <Link to="/profile">
            <Icon name="user" />
            <b> Profile</b>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">
            <Button
              id="topnav-logout-button"
              primary
              onClick={loginService.logout}
            >
              Log out
            </Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </>
  );
};

const LoggedOutTopNav: React.FC = () => (
  <>
    <Menu.Menu
      position="right"
      style={{ paddingRight: '20px' }}
    >
      <Menu.Item>
        <Link to="/login">
          <Button
            id="topnav-login-button"
            secondary
            style={{ background: '#324D66' }}
          >
            Log In
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/register">
          <Button
            id="topnav-signup-button"
            primary
          >
            Sign Up
          </Button>
        </Link>
      </Menu.Item>
    </Menu.Menu>
  </>
);

const TopNav: React.FC = () => {
  const [state] = useGlobalState();

  return (
    <Grid>
      <Grid.Row style={{ padding: '15px', background: '#0E2C47' }}>
        <Menu
          inverted
          secondary
          size="large"
          style={{
            background: '#0E2C47',
            minWidth: '100%',
          }}
        >
          <Menu.Item>
            <Link to="/">
              <Header inverted style={{ marginLeft: '30px' }}>
                SurveyCreatorPro
              </Header>
            </Link>
          </Menu.Item>
          {state.isLoggedIn ? <LoggedInTopNav /> : <LoggedOutTopNav />}
        </Menu>
      </Grid.Row>
    </Grid>
  );
};

export default TopNav;
