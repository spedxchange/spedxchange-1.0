const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Set cors
const allowedOrigins = [
  'http://localhost:3000/',
  'http://localhost:3000',
  'http://localhost:5000/',
  'http://localhost:5000',
  'https://spedxchange.herokuapp.com/',
  'http://spedxchange.herokuapp.com',
  'https://spedxchange.com/',
  'https://spedxchange.com'
];
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/tags', require('./routes/api/tags'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/news', require('./routes/api/articles'));
app.use('/api/upload', require('./routes/api/upload'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
