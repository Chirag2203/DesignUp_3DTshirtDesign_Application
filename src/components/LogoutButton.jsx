import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && (
    //changes from logoutWithRedirectthing to logout()
    <button className='gb-btn' onClick={() => logout()}>Log out</button>
  );
};

export default LogoutButton;
