const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mime = require('mime-types');

// configure environment
console.log('process: ', process.env.NODE_ENV);
if (!process.env.NODE_ENV) {
  // console.log('do process...');
  const dotenv = require('dotenv');
  dotenv.config();
}
// Set cors
// const allowedOrigins = [
//   'http://localhost:3000/',
//   'http://localhost:5000/',
//   'https://spedxchange.herokuapp.com/',
//   'http://spedxchange.herokuapp.com/',
//   'https://spedxchange.com/',
//   'https://spedxchange.com/'
// ];
// app.use(
//   cors({
//     origin: function(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   })
// );
app.use(cors());

// Connect Database
const connectDB = require('./config/db');
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/tags', require('./routes/api/tags'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/news', require('./routes/api/articles'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/roles', require('./routes/api/roles'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    // console.log('req.headers: ', req.headers);
    const hasExtension = req.url.indexOf('.') > -1;
    const type = hasExtension ? mime.contentType(path.extname(req.url)) : null;
    if (hasExtension && type) {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Content-Type', type);
      res.sendFile(path.join(__dirname, req.url));
    } else {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
