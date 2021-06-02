// import modules
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
require('dotenv').config();

// utilize modules
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
// app.use(require('morgan')('dev'));

// misc. variables
const PORT = 5000
const log = console.log
const omdbApiKey = process.env.OMDB_API_KEY

// Routes
app.get('/', function(req, res) {
  res.send('Hello, backend!');
});

// listen to port
app.listen(PORT, () => {
  log(`Welcome to Port ${PORT}.`)
})

// We can export this server to other servers like this
// module.exports = server;
