import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import ParticleEffect from './particle';

import state from '../store';
import { CustomButton, LoginButton, LogoutButton , ProfileButton, Loading } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);

  // State to track the current theme (light or dark)
const [isDarkMode, setIsDarkMode] = useState(false);

// Function to toggle the theme
const toggleTheme = () => {
  setIsDarkMode((prevMode) => !prevMode);
};

// Apply the theme class to the body based on isDarkMode state
useEffect(() => {
  const body = document.body;
  if (isDarkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}, [isDarkMode]);

//for checking loging status
const {isLoading,error} = useAuth0();

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.div {...slideAnimation("down")} className='navh flex '>
            <div className='flex justify-center gap-3 items-center'>
            <img 
              src='./Logo.png'
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <p className='text-lg font-semibold '>Design Up</p>
            
            </div>
            <motion.div className='ml-64 pl-64'> 

            <motion.div className='flex gap-3 mx-3'>

            {error && <div>Oops... </div>}
            {isLoading && <Loading/>}
            {!error && !isLoading && (
              <>
            <LoginButton/>
            <LogoutButton/>
            <ProfileButton/>
            </> 
            )
            }
            </motion.div>
            </motion.div>
            {/* Theme Toggle Button */}
            <label className=" btn ts-container "  type='checkbox'>
            <input onClick={toggleTheme} type="checkbox"></input>
            <span class="slider"></span>
              {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
            </label>
          </motion.div>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="text-6xl font-bold head-text">
                Unleash Your <br className="xl:block hidden" /> Imagination.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md  text-blue-600 text-base">
                Upload your artwork and see it come to life on a 3D t-shirt. Design Up lets you customize your own t-shirt with your own artwork and colors.
              </p>
              
              <button className='start-btn w-64 font-semibold inherit'
                type="filled" 
                // title="Customize It"
                onClick={() => state.intro = false}
                // customStyles="w-64 px-4 py-2.5 font-bold text-sm"
              > Design Now!</button>
              
            </motion.div>
          <img src="./telegram.png" className='w-10 h-10 ml-16 telgicon' alt="" />
          </motion.div>
           {/* Add the ParticleEffect component */}
           
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home