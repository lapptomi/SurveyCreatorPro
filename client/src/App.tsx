import React, { useEffect } from 'react';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseSurveysPage from './pages/BrowseSurveysPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useGlobalState } from './state/state';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [state] = useGlobalState();

  useEffect(() => {
    console.log('STATE = ', state);
  }, []);

  if (state.isLoading) {
    return <LoadingScreen isLoading={!state.isLoading} />;
  }

  return (
    <Router>
      <div
        className='App'
        style={{
          minWidth: '768px',
          minHeight: '1200px',
          background: '#0E2C47',
        }}
      >
      <TopNav />
        <div style={{ minHeight: '1000px' }}>
          <Switch>

          <Route path='/register'>
            { state.isLoggedIn ?  <Redirect to="/" /> : <RegisterPage /> }
          </Route>

          <Route path='/login'>
            { state.isLoggedIn ?  <Redirect to="/" /> : <LoginPage /> }
          </Route>

          <Route path='/surveys/browse'>
            { state.isLoggedIn ? <BrowseSurveysPage /> : <Redirect to="/" /> }
          </Route>

          <Route path='/surveys/create'>
            { state.isLoggedIn ? <CreateSurveyPage /> : <Redirect to="/" /> }
          </Route>

          <Route path='/'>
            <HomePage />
          </Route>

          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
