import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileView() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/files')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleDownload = (filename) => {
    // Implement your download logic here
    console.log(`Downloading file: ${filename}`);
  };

  return (
    <div>
      <h2>View Files</h2>
      <table className="file-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.id}>
              <td>
                <a href={`http://localhost:5000/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer">
                  {file.filename}
                </a>
              </td>
              <td>
                <button onClick={() => handleDownload(file.filename)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileView;
