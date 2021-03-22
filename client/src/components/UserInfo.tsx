import React from 'react';
import { User } from '../types';

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <p>Id: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
    </>
  );
};

export default UserInfo;