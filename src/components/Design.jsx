import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import SavedDesignsPopup from "./SavedDesignsPopup";

const Designs = () => {
  const snap = useSnapshot(state);

  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteDesign = (designId) => {
    const updatedDesigns = snap.designs.filter((design) => design.id !== designId);
    state.designs = updatedDesigns;
  };

  const handleEditDesignName = (designId, newName) => {
    const updatedDesigns = state.designs.map((design) =>
      design.id === designId ? { ...design, name: newName } : design
    );
    state.designs = updatedDesigns;
  };
  // Function to handle saving the edited design name (called on pressing Enter)
  const handleSaveDesignName = (event, designId) => {
    if (event.key === "Enter") {
      const newName = event.target.value.trim();
      handleEditDesignName(designId, newName);
    }
  };


  const [designsState, setDesignsState] = useState([]);

  useEffect(() => {
    // Whenever the global state.designs changes, update the local state
    setDesignsState(snap.designs);
  }, [snap.designs]);


  const handleToggleEditing = (designId) => {
    handleEditDesignName(designId, designsState.find((design) => design.id === designId)?.name || "");
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleLoadDesign = (design) => {
    state.logoPosition = design.logoPosition;
    state.logoScale = design.logoScale;
    state.logoRotation = design.logoRotation;
    // state.fullDecal = design.fullDecal;
    // state.logoDecal = design.logoDecal;
  };



  return (
    <div className="designs-container flex flex-col justify-start items-center m-5 z-40">
      <h1 className="text-3xl font-bold mb-5">My Designs <span className='text-sm font-light text-red-500'>(under build)</span></h1>
      {snap.designs.map((design) => (
        <div key={design.id} className="flex flex-col m-3">
          <div className="designs-grid bg-slate-300 gap-5 flex items-center justify-between rounded-lg h-14 p-5">
            {/* Display design details */}
            {design.editing ? (
              <input
                type="text"
                className="text-lg rounded-lg text-slate-900 bg-slate-300 outline-none w-32 overflow-hidden hover:bg-slate-500 px-2"
                value={design.name}
                autoFocus
                onBlur={() => handleToggleEditing(design.id)}
                
                onChange={(event) => handleEditDesignName(design.id, event.target.value)}
                onKeyDown={(event) => handleSaveDesignName(event, design.id)} // Handle saving on Enter key press
                />
            ) :
             (
              <h2 className="text-xl font-semibold" onClick={() => handleToggleEditing(design.id)}>
                {design.name}
              </h2>
            )}
            <p>Design ID: {design.id}</p>
            <div className="flex gap-3 ml-32">
              <button className="gb-btn" onClick={() => handleLoadDesign(design)}>
                Load
              </button>
              <button className="gb-btn" onClick={() => handleDeleteDesign(design.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className="gb-btn w-auto px-2 mt-5" onClick={handleShowPopup}>
        Saved designs
      </button>
      {showPopup && (
        <SavedDesignsPopup
          designs={designsState} // Pass the designs to the popup
          handleLoadDesign={handleLoadDesign}
          handleDeleteDesign={handleDeleteDesign}
          handleClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Designs;
