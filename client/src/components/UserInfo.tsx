import React from 'react';
import { User } from '../types';

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <p>Id: {user.id}</p>
      <p>Username: {user.id}</p>
      <p>Password: {user.id}</p>
    </>
  );
};

export default UserInfo;