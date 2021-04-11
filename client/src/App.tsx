import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import BrowseSurveysPage from './components/pages/BrowseSurveysPage';
import CreateSurveyPage from './components/pages/CreateSurveyPage';
import surveyService from './services/surveys';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';


const SignInRoutes: React.FC = () => {
  return (
    <Switch>
    <Route path='/surveys/browse'>
      <BrowseSurveysPage />
    </Route>
    <Route path='/surveys/create'>
      <CreateSurveyPage />
    </Route>
    <Route path='/'>
      <HomePage />
    </Route>
  </Switch>
  );
};

const SignOutRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/'>
        <HomePage />
      </Route>
    </Switch>
  );
};

const App: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedUser(user);
      surveyService.setToken(user.token);
    }
  }, []);

  return (
    <Router>
      <div
        className='App'
        style={{
          minWidth: '768px',
          minHeight: '1200px',
          background: '#1b1c1d',
        }}
      >
      <NavBar />
        <Segment vertical>
          {loggedUser
            // Use different routes if user is logged in
            ? <SignInRoutes />
            : <SignOutRoutes />
          } 
        </Segment>
      </div>
      <Footer />
    </Router>
  );
};

export default App;