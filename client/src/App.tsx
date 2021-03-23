import React from 'react';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';
import RegisterForm from './components/RegisterForm';
import { 
  BrowserRouter as Router, Route, Switch 
} from 'react-router-dom';
import HomePageHeading from './components/HomePageHeading';

const App: React.FC = () => {
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
