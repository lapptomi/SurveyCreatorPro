import React from 'react';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Segment } from 'semantic-ui-react';

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
      </Segment>
      <h2>Hello world!</h2>
      <h2>Users in database:</h2>
      <UserList />
      <Footer />
    </div>
  );
};

export default App;
