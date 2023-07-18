// FilePicker.js
import React from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ fileHistory, onFileSelect }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    onFileSelect(selectedFile);
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {fileHistory.length === 0
            ? 'No file selected'
            : fileHistory[0].name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="filled"
          title="Logo"
          handleClick={() => onFileSelect('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => onFileSelect('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
