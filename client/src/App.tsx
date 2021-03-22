import React from 'react';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <div>
      <h2>Hello world!</h2>
      <h2>Users in database:</h2>
      <UserList />
    </div>
  );
};

export default App;
