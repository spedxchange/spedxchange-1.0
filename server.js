const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const pagePath = path.join(__dirname, '/client/build/index.html');
const filePath = path.join(__dirname, '/client/build/');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Set cors
const allowedOrigins = [
  'http://localhost:3000/',
  'http://localhost:3000',
  'http://localhost:5000/',
  'http://localhost:5000',
  'https://spedxchange.herokuapp.com/',
  'https://spedxchange.herokuapp.com',
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
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/tags', require('./routes/api/tags'));
app.use('/api/search', require('./routes/api/search'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/static', express.static(filePath));
  app.use('*', express.static(pagePath));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
