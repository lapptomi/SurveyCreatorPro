import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrowseSurveysPage from './pages/BrowseSurveysPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useGlobalState } from './state/state';
import Loading from './components/Loading';
import SurveyPage from './pages/SurveyPage';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {
  const [state] = useGlobalState();

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div
        className="App"
        style={{
          minWidth: '768px',
          minHeight: '1200px',
          background: '#0E2C47',
        }}
      >
        <TopNav />
        <div style={{ minHeight: '1000px' }}>
          <Switch>

            <Route exact path="/register">
              { state.isLoggedIn ? <Redirect to="/" /> : <RegisterPage /> }
            </Route>

            <Route exact path="/login">
              { state.isLoggedIn ? <Redirect to="/" /> : <LoginPage /> }
            </Route>

            <Route exact path="/surveys/browse">
              { state.isLoggedIn ? <BrowseSurveysPage /> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/surveys/create">
              { state.isLoggedIn ? <CreateSurveyPage /> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/surveys/:id">
              { state.isLoggedIn ? <SurveyPage /> : <Redirect to="/" /> }
            </Route>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
