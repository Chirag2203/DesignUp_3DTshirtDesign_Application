// ProfilePage.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ThemeSwitch, LogoutButton, FilePicker, LoginButton } from '../components';
import boy from '../assets/boy.png';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [fileHistory, setFileHistory] = useState([]);

  // Function to handle file selection from FilePicker component
  const handleFileSelect = (file) => {
    setFileHistory((prevHistory) => [file, ...prevHistory.slice(0, 4)]);
  };

    if (!isAuthenticated) {
      // If the user is not authenticated, you can redirect them to the login page or handle it accordingly.
      // For this example, we'll simply show a message if the user is not logged in.
      return <div className='flex m-5 p-5'>
        <p className=" mr-5 text-2xl font-bold font-black ml-3 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Please log in to view your profile.</p>
        <LoginButton />
        
      </div>;
    }

  return (
    <div className="profile-page z-20 glassmorphism h-screen">
      <nav className="profile-info flex  justify-between p-3 bg-orange-400">
        <span className="text-2xl font-bold font-black ml-3 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
          PROFILE PAGE
        </span>
        <div className="flex gap-5 items-center justify-center">
          {/* <Link to ="/"><button>Go Back</button></Link> */}
          <LogoutButton />
          <ThemeSwitch />
        </div>
      </nav>
      <main className="flex justify-center mt-5">
        <div className="pcard">
          {user.picture ? (
            <img className="pimg" src={user.picture} alt="Profile" />
          ) : (
            <img className="pimg" src={boy} alt="Default Profile" />
          )}

          <div className="pinfo">
            <span>{user.name}</span>
            <p>-</p>
            <p>Email Id : {user.email ? user.email : 'N/A'}</p>
          </div>
          <button className="gb-btn mt-5 w-32">Share Profile</button>
        </div>
      </main>
      {/* Pass handleFileSelect function to FilePicker component */}
      <FilePicker fileHistory={fileHistory} onFileSelect={handleFileSelect} />
    </div>
  );
};

export default ProfilePage;
