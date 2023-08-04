import React from "react";

const SavedDesignsPopup = ({ designs, handleLoadDesign, handleDeleteDesign, handleClose }) => {
  return (
    <div className=" z-40 saved-designs-popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 w-96">
        <h1 className="text-xl font-bold mb-4">Saved Designs <span className='text-sm font-light text-red-500'>(under build)</span></h1>
        {designs.map((design) => (
          <div key={design.id} className="flex items-center justify-between mb-3">
            <p className="text-lg">{design.name}</p>
            <div className="flex gap-2">
              <button className="gb-btn" onClick={() => handleLoadDesign(design)}>
                Load
              </button>
              <button className="gb-btn" onClick={() => handleDeleteDesign(design.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <button className="gb-btn w-full mt-4 z-30" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedDesignsPopup;
