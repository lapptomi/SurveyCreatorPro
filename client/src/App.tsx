import React from 'react';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <div>
      <h2>Hello world!</h2>
      <h3>Users in database:</h3>
      <UserList />
    </div>
  );
};

export default App;
