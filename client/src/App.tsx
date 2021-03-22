import React from 'react';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';
import RegisterForm from './components/RegisterForm';

const App: React.FC = () => {
  return (
    <div>
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical
      >
        <NavBar />
        <LoginForm />
        <RegisterForm />
      </Segment>
      <Footer />
    </div>
  );
};

export default App;
