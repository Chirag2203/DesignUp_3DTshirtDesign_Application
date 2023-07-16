import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import React, { useState, useEffect } from 'react';

import state from '../store';
import { CustomButton } from '../components';
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


  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")} className='flex justify-between  items-center'>
            <div className='flex justify-center gap-3 items-center'>
            <img 
              src='./Logo.png'
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <p className='text-lg font-semibold '>Design Up</p>
            
            </div>
            {/* Theme Toggle Button */}
            <label className=" btn ts-container "  type='checkbox'>
            <input onClick={toggleTheme} type="checkbox"></input>
            <span class="slider"></span>
              {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
            </label>
          </motion.header>

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

              <CustomButton 
                type="filled"
                title="Customize It"
                handleClick={() => state.intro = false}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home