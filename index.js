const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const db = require('./config/mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Set up route
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`The server is running on the port: ${port}`);
})