import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios
        .post('http://localhost:5000/upload', formData)
        .then((response) => {
          setSuccessMessage('File uploaded successfully');
          setErrorMessage(null); // Clear any previous error messages
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000); // Display success message for 5 seconds
        })
        .catch((error) => {
          setErrorMessage('Error uploading file');
          setSuccessMessage(null); // Clear any previous success messages
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000); // Display error message for 5 seconds
        });
    }
  };

  return (
    <div>
      <h2>Upload a File (PDF or DOC)</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default FileUpload;
