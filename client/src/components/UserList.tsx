import React from 'react';
import userService from '../services/users';
import UserInfo from './UserInfo';
import { User } from '../types';

const UserList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    userService.getAll()
      .then((data) => setUsers(data));
  }, []);

  if (users.length === 0) {
    return <b>No users in database!</b>;
  }
  return (
    <div>
      {Object.values(users).map((user: User, i: number) => 
        <UserInfo key={i} user={user}/>
      )}
    </div>
  );
};

export default UserList;