import React, { useEffect, useState } from 'react';
import LoginForm from './components/form/LoginForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';
import RegisterForm from './components/form/RegisterForm';
import { 
  BrowserRouter as Router, Route, Switch 
} from 'react-router-dom';
import HomePageHeading from './components/HomePageHeading';
import BrowseSurveysPage from './components/BrowseSurveysPage';
import CreateSurveyPage from './components/CreateSurveyPage';
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
        <Segment
          inverted
          style={{ 
            minHeight: '1000px',
            minWidth: '480px',
            padding: '1em 0em',
            height: '100vh'
          }}
          vertical
        >
        <NavBar />
          <Switch>
            <Route path='/surveys/browse'>
              <BrowseSurveysPage />
            </Route>
            <Route path='/surveys/create'>
              <CreateSurveyPage />
            </Route>
            <Route path='/'>
              <HomePageHeading />
            </Route>
          </Switch>
          <Footer />
        </Segment>
      </Router>
    );
  }

  return (
    <div className='App' 
      style={{ 
        position: 'relative', 
        minHeight: '1000px'
      }}
    >
      <Router>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: '120vh', padding: '1em 0em'}}
          vertical
        >
          <NavBar />
            <Switch>
              <Route path='/register'>
                <RegisterForm />
              </Route>
              <Route path={['/login', '/testurl']}>
                <LoginForm />
              </Route>
              <Route path='/'>
                <HomePageHeading />
              </Route>
            </Switch>
          </Segment>
        <Footer />
      </Router>
    </div>
  );
};

export default App;