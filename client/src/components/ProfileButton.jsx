// import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
const ProfileButton = ({handleClick}) => {
    const {  isAuthenticated } = useAuth0();
    
    

  return isAuthenticated && (
    //changes from logoutWithRedirectthing to logout()
    <Link  to="/Profile"  ><button className='gb-btn'>Profile</button></Link>
  );
};

export default ProfileButton;


