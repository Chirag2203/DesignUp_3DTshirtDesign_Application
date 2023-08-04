import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ThemeSwitch,
  LogoutButton,
  Design,
  LoginButton,
  Loading,
} from "../components";
import boy from "../assets/boy.png";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [editedName, setEditedName] = useState(user.name || ""); // Local state to store the edited name
  const [isEditingName, setIsEditingName] = useState(false); // Local state to toggle the edit mode

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page or handle it accordingly.

    return (
      <div className="flex flex-col h-screen fm-5 p- ">
        <div className="flex justify-between h-32 items-center mx-12">
          <p className=" mr-5 text-2xl  font-black ml-3 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Please log in to view your profile.
          </p>
          <div className="flex gap-5 ">
            <LoginButton />
            <Link to="/">
              <button className="gb-btn">Home</button>
            </Link>
          </div>
        </div>
        <Loading />
      </div>
    );
  }

  const handleSaveName = () => {
    
    user.name = editedName;
    setIsEditingName(false); // Disable the edit mode after saving the name
  };

  return (
    <div className="profile-page z-20  h-screen m-0 p-0">
      <nav className="profile-info flex  justify-between p-3 mx-12 mt-4  bg-gradient-to-l from-sky-700 to-indigo-800 bg-clip-text text-transparent">
        <span className="text-2xl font-bold font-black ml-3 bg-gradient-to-l from-sky-700 to-indigo-800 bg-clip-text text-transparent">
          PROFILE PAGE
        </span>
        <div className="flex gap-5 items-center justify-center">
          {/* <Link to ="/"><button>Go Back</button></Link> */}
          <Link to="/PremiumPlanPage">
            <button className="prem-btn flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              <span>Unlock Pro</span>
            </button>
          </Link>
          <LogoutButton />
          <Link to="/">
            <button className="gb-btn">Home</button>
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
      <main className="flex justify-center mt-12  ">
        <div className="pcard">

          <img className="pimg" src={boy} alt="Default Profile" />
         

          <div className="pinfo w-auto flex flex-col h-32">
            {/* Show the input field in the edit mode */}
            {isEditingName ? (
              <input
              className="text-gray-900 outline-none inpt-txt backdrop-blur-lg bg-blue-100 rounded-lg px-2 text-center  "
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <span className="text-center ">{user.name}</span>
            )}
            <p className="text-center">----</p>
            <div className="flex flex-col justify-start items-start">
              <p>Email Id : {user.email ? user.email : "N/A"}</p>
              <p>Account Type: Trial</p>
            </div>
          </div>

          {/* Show the "Edit" or "Save" button based on the edit mode */}
          <div>
            {isEditingName ? (
              <button className="gb-btn z-40" onClick={handleSaveName}>Save</button>
            ) : (
              <button  className="gb-btn z-40" onClick={() => setIsEditingName(true) }>Edit</button>
            )}
          </div>
        </div>
      </main>
      <Design />
      
    </div>
  );
};

export default ProfilePage;
