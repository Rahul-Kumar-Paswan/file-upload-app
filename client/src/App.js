import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import FileUpload from './components/FileUpload';
import FileView from './components/FileView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/upload">Upload File</Link>
              </li>
              <li>
                <Link to="/view">View Files</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/view" element={<FileView />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
