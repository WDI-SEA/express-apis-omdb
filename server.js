require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
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
app.use(require('morgan')('dev'));

const API_KEY = process.env.API_KEY

console.log('process.env:', process.env.API_KEY)
// http://www.omdbapi.com/?i=tt3896198&apikey=3f1299c3

console.log(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`)
// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// GET / results -- take in data from the search form, render search results from OMDB
app.get('/results', (req, res) => {
  res.send('this should be search results')
})
app.get('/movies/:id', (req, res) => {
  res.send(`show the deets on movie with id: ${req.params.id}`)
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
