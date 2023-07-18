import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import html2canvas from 'html2canvas'; 

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab, DownloadButton,ProfileButton } from '../components';



const Customizer = () => {



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

// const[resetDesign, setResetDesign] = useState(false);
// const toggleResetDesign = () => {
//   setResetDesign((prevMode) => !prevMode);
// };
// useEffect(() => {
//   if(resetDesign){
//     state.logo = null;
//     state.full = null;
//     state.isLogoTexture = true;
//     state.isFullTexture = false;
//     setResetDesign(false);
//   }
// }, [resetDesign]);



// const handleResetClick = () => {
//   resetDesign();
// };


  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      default:
        return null;
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

 

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
   // Function to capture the canvas and initiate download
   const captureCanvasAndDownload = () => {
    const canvasElement = document.getElementById('your-canvas-id');

    if (!canvasElement) {
      console.error("Canvas element not found.");
      return;
    }

    // Use html2canvas to capture the canvas content as an image
    html2canvas(canvasElement).then((canvas) => {
      // Convert the captured canvas to a data URL and initiate the download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = '3D_Model_Image.png';
      link.href = image;
      link.click();
    });
    
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="absolute z-10 top-5  flex gap-5 justify-between items-center navh "
            {...fadeAnimation}
          >
            <span className='text-2xl font-bold font-black ml-3  bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent '>DESIGN ROOM</span>

            <motion.div className='flex right-5 mx-5 gap-3 justify-center items-center'>

            <button  onClick={() => state.intro = true}  className='gb-btn'> Go Back </button>
            {/* <button    className='gb-btn'> Sign in </button> */}
            {/* add the reset function here */}
            
            <ProfileButton/>
            {/* BOOKMARK */}
            <button class="bookmarkBtn">
              <span class="IconContainer"> 
                <svg viewBox="0 0 384 512" height="0.9em" class="icon"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
              </span>
              <p class="text">Save</p>
            </button>
            {/* REFRESH */}
            <button   className='gb-btn w-9  rounded-3xl'>
            <svg viewBox="0 0 16 16" class="bi bi-arrow-repeat" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 ml-1 refresh-btn'>
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
              <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill-rule="evenodd"></path>
            </svg>  </button>
            {/* <button  onClick={() => state.intro = true}  className='gb-btn'> Sa </button> */}
            <DownloadButton handleClick={captureCanvasAndDownload} /> {/* Use the custom DownloadButton */}
            
            {/* Theme Toggle Button */}
            <label className=" btn ts-container"  type='checkbox'>
            <input onClick={toggleTheme} type="checkbox"></input>
            <span class="slider"></span>
              {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
            </label>
            </motion.div>
           
          </motion.div>
          
          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer;
