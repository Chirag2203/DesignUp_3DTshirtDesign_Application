import React,  { useState, useEffect } from 'react'

import CustomButton from './CustomButton'

//need to shift and manage the history in parent component
const FilePicker = ({ file, setFile, readFile }) => {

  const [fileHistory, setFileHistory] = useState([]);

  // Load the file history from localStorage on component mount
  useEffect(() => {
    const storedFileHistory = localStorage.getItem('fileHistory');
    if (storedFileHistory) {
      setFileHistory(JSON.parse(storedFileHistory));
    }
  }, []);

  // Function to handle file selection from FilePicker component
  const handleFileSelect = (selectedFile) => {
    const fileObject = {
      name: selectedFile.name,
      file: selectedFile,
    };

    setFile(selectedFile);

    setFileHistory((prevHistory) => [fileObject, ...prevHistory.slice(0, 9)]);
  };

  useEffect(() => {
    localStorage.setItem('fileHistory', JSON.stringify(fileHistory));
  }, [fileHistory]);
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}

        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <CustomButton 
          type="filled"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton 
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
      
      <div className="mt-4">
        <h2 className="text-sm font-semibold mb-2">History: <span className='text-sm font-light text-red-500'>(under build)</span></h2> 
        {fileHistory.map((fileObject, index) => (
          <p key={index} className="text-gray-500 text-xs truncate">
            - {fileObject.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default FilePicker