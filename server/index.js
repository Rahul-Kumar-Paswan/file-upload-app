const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

// Get the absolute path to the "uploads" directory
const uploadsDir = path.join(__dirname, 'uploads');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'Rahul@123',
  database: 'file_upload_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

app.use(cors());
app.use(express.json());

// Use the absolute path to the "uploads" directory to serve static files
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueFilename = `${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { filename, path } = req.file;

  if (!filename || !path) {
    res.status(400).send('Invalid file data');
    return;
  }

  const sql = 'INSERT INTO files (filename, filepath) VALUES (?, ?)';
  db.query(sql, [filename, path], (err) => {
    if (err) {
      res.status(500).send('Error uploading the file');
    } else {
      res.send('File uploaded successfully');
    }
  });
});

app.get('/files', (req, res) => {
  const sql = 'SELECT * FROM files';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching files:', err);
      res.status(500).send('Error fetching files');
    } else {
      res.json(result);
    }
  });
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const file = path.join(uploadsDir, filename);

  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
