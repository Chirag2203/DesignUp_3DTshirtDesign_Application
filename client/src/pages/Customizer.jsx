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
import { ColorPicker, CustomButton, FilePicker, Tab, DownloadButton } from '../components';





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
            className="absolute z-10 top-5 right-5 flex gap-5 justify-center items-center"
            {...fadeAnimation}
          >
            <DownloadButton handleClick={captureCanvasAndDownload} /> {/* Use the custom DownloadButton */}
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            
            {/* Theme Toggle Button */}
            <label className=" btn ts-container"  type='checkbox'>
            <input onClick={toggleTheme} type="checkbox"></input>
            <span class="slider"></span>
              {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
            </label>
           
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
