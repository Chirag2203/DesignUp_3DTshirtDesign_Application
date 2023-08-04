import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { proxy, useSnapshot, snapshot } from "valtio";
import html2canvas from "html2canvas";
import state from "../store";
import {  reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  ColorPicker,
  FilePicker,
  Tab,
  DownloadButton,
  ThemeSwitch,
  SocialButton,
  SavedDesignsPopup,
  Design,
} from "../components";
import {} from "../Buttons";
import {
  moveLogoLeft,
  moveLogoRight,
  moveLogoUp,
  moveLogoDown,
} from "../components/store";

const Customizer = () => {
  const handleMoveLeft = () => {
    moveLogoLeft();
  };

  const handleMoveRight = () => {
    moveLogoRight();
  };

  const handleMoveUp = () => {
    moveLogoUp();
  };

  const handleMoveDown = () => {
    moveLogoDown();
  };
  const handleScaleUp = () => {
    state.logoScale += 0.5;
  };

  const handleScaleDown = () => {
    state.logoScale = Math.max(0.5, state.logoScale - 0.5);
  };

  const handleRotateLeft = () => {
    state.logoRotation -= 15; // Decrease the rotation by 15 degrees on each click 
  };

  const handleRotateRight = () => {
    state.logoRotation += 15; // Increase the rotation by 15 degrees on each click 
  };

  //reset button functionality
  // we iterate over the state object and reset all the properties except the intro property
  //this happens in valtio
  const [initialState, setInitialState] = useState(snapshot(proxy(state)));
  useEffect(() => {
    // Save the initial state when the component mounts
    setInitialState(snapshot(proxy(state)));
  }, []);
  const handleResetClick = () => {
    // Reset the state to the initial state
    Object.keys(state).forEach((key) => {
      if (key !== "intro") {
        // Reset the logo position, scale, and rotation
        if (key === "logoPosition") {
          state[key] = defaultLogoPosition;
        } else if (key === "logoScale") {
          state[key] = 1;
        } else if (key === "logoRotation") {
          state[key] = 0;
        } else {
          state[key] = initialState[key];
        }
      }
    });
  };

  const [savedDesigns, setSavedDesigns] = useState([]);
  const handleBookmarkClick = () => {
    // Capture the current design state
    const currentDesign = {
      logoPosition: state.logoPosition,
      logoScale: state.logoScale,
      logoRotation: state.logoRotation,
    };

    // Add the current design to the savedDesigns state
    setSavedDesigns((prevSavedDesigns) => [...prevSavedDesigns, currentDesign]);
  };

  const handleSaveDesign = () => {
    state.saveDesign(); // Call the saveDesign function from the state object
    alert("Design saved successfully!");
  };

  //for tab to hide when clicked
  const tabContainerRef = useRef(null);

  // Add an event listener to detect clicks outside the tab container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tabContainerRef.current &&
        !tabContainerRef.current.contains(event.target)
      ) {
        setActiveEditorTab(""); // Hide the tab content when clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // Remove the event listener when the component unmounts
    };
  }, []);

  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

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
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  // Function to capture the canvas and initiate download
  const captureCanvasAndDownload = () => {
    const canvasElement = document.getElementById("your-canvas-id");

    if (!canvasElement) {
      console.error("Canvas element not found.");
      return;
    }

    // Use html2canvas to capture the canvas content as an image
    html2canvas(canvasElement).then((canvas) => {
      // Convert the captured canvas to a data URL and initiate the download
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "3D_Model_Image.png";
      link.href = image;
      link.click();
    });
  };

  const [designsState, setDesignsState] = useState([]);

  useEffect(() => {
    // Whenever the global state.designs changes, update the local state
    setDesignsState(snap.designs);
  }, [snap.designs]);
  const handleDeleteDesign = (designId) => {
    const updatedDesigns = snap.designs.filter(
      (design) => design.id !== designId
    );
    state.designs = updatedDesigns;
  };

  // Function to load a design
  const handleLoadDesign = (design) => {
    state.logoPosition = design.logoPosition;
    state.logoScale = design.logoScale;
    state.logoRotation = design.logoRotation;
    // state.fullDecal = design.fullDecal;
    // state.logoDecal = design.logoDecal;
  };
  const [showSavedDesignsPopup, setShowSavedDesignsPopup] = useState(false);

  const handleShowSavedDesignsPopup = () => {
    setShowSavedDesignsPopup(true);
  };

  const handleCloseSavedDesignsPopup = () => {
    setShowSavedDesignsPopup(false);
  };

  return (
    <AnimatePresence className="h-screen">
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            ref={tabContainerRef}
            className="absolute top-0 left-0 z-10 "
            {...slideAnimation("left")}
          >
            <div className="flex  items-center justify-center min-h-screen editor">
              <div className="editortabs-container tabs ">
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

          {/* Right Side */}
          <motion.div
            className="absolute z-10 top-0 right-5 flex flex-col h-screen justify-center items-center  gap-2 "
            {...fadeAnimation}
          >
            <span className="font-semibold text-lg">Move Logo</span>
            <div className="flex gap-2">
              <button className="move-btn" onClick={handleMoveUp}>
                Up
              </button>
              <button className="move-btn" onClick={handleMoveDown}>
                Down
              </button>
            </div>
            <div className="flex gap-2">
              <button className="move-btn" onClick={handleMoveLeft}>
                Left
              </button>
              <button className="move-btn" onClick={handleMoveRight}>
                Right
              </button>
            </div>

            <div className="flex gap-2">
              <button className="move-btn" onClick={handleScaleUp}>
                Scale +
              </button>
              <button className="move-btn" onClick={handleScaleDown}>
                Scale -
              </button>
            </div>
            <div className="flex gap-2">
              <button className="move-btn" onClick={handleRotateLeft}>
                Rotate L
              </button>
              <button className="move-btn" onClick={handleRotateRight}>
                Rotate R
              </button>
            </div>

            <SocialButton />
          </motion.div>

          <motion.div
            className="absolute z-10 top-5  flex gap-5 justify-between items-center navh "
            {...fadeAnimation}
          >
            <span className="text-2xl font-bold font-black ml-8  bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent ">
              DESIGN ROOM
            </span>

            <motion.div className="flex right-5 mx-8 gap-3 justify-center items-center">
              <button onClick={() => (state.intro = true)} className="gb-btn">
                {" "}
                Go Back{" "}
              </button>
             {/* saved designs */}
              <button
                className="gb-btn w-auto px-2"
                onClick={handleShowSavedDesignsPopup}
              >
                Saved Designs
              </button>
              {/* save design */}
              <button class="bookmarkBtn " onClick={handleSaveDesign}>
                <span class="IconContainer">
                  <svg viewBox="0 0 384 512" height="0.9em" class="icon">
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                  </svg>
                </span>
              </button>
              {/* REFRESH */}
              <button
                className="gb-btn w-9  rounded-3xl"
                onClick={handleResetClick}
              >
                <svg
                  viewBox="0 0 16 16"
                  class="bi bi-arrow-repeat"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 ml-1 refresh-btn"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                  <path
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    fill-rule="evenodd"
                  ></path>
                </svg>{" "}
              </button>
              <DownloadButton handleClick={captureCanvasAndDownload} />{" "}
              <ThemeSwitch />
            </motion.div>
          </motion.div>

          <motion.div
            className="filtertabs-container"
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
      {/* saved design popup reder */}
      {showSavedDesignsPopup && (
        <SavedDesignsPopup
          designs={designsState} // Pass the designs to the popup
          handleLoadDesign={handleLoadDesign}
          handleDeleteDesign={handleDeleteDesign}
          handleClose={handleCloseSavedDesignsPopup}
        />
      )}
    </AnimatePresence>
  );
};

export default Customizer;
