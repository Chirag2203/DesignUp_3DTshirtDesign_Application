// import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
const ProfileButton = () => {
    const {  isAuthenticated } = useAuth0();
    
    // const handleClick = () => { 
    // const navigate = useNavigate(); // Create a useHistory instance
    // navigate('/Profile'); // Push the new route to history
    // };

  return isAuthenticated && (
    //changes from logoutWithRedirectthing to logout()
    <button className='gb-btn'  >Profile</button>
  );
};

export default ProfileButton;


