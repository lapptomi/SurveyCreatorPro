import React, { useEffect, useState } from 'react';
import LoginForm from './components/form/LoginForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';
import RegisterForm from './components/form/RegisterForm';
import { 
  BrowserRouter as Router, Route, Switch 
} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import BrowseSurveysPage from './components/pages/BrowseSurveysPage';
import CreateSurveyPage from './components/pages/CreateSurveyPage';
import surveyService from './services/surveys';

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

  if (loggedUser) {
    return (
      <Router>
        <div 
          className='App' 
          style={{ 
            minWidth: '768px'
          }}
        >
        <NavBar />
        <Segment vertical>
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
        </Segment> 
          <Footer /> 
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div 
        className='App' 
        style={{ 
          minWidth: '768px',
        }}
      >
      <NavBar />
        <Segment vertical>
          <Switch>
            <Route path='/register'>
              <RegisterForm />
            </Route>
            <Route path='/login'>
              <LoginForm />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Segment> 
      <Footer /> 
      </div>
    </Router>
  );
};

export default App;