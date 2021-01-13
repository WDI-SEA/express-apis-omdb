require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const AXIOS = require('axios');
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

// Routes
//home route - form index
app.get('/', function(req, res) {
  res.render('index');
});

//results route
app.get('/results', (req, res) =>{
  let queryTerm = req.query
  console.log(req.query);
  console.log(queryTerm.query);
  console.log(`http://www.omdbapi.com/?s=${queryTerm.query}&apikey=${process.env.OMDB_API_KEY}`)
  AXIOS.get(`http://www.omdbapi.com/?s=${queryTerm.query}&apikey=${process.env.OMDB_API_KEY}`)
  .then(response => {
    // console.log(response);
    // res.send(response.data);
    //here we will need to res.render the results page with response.data
    res.render('results')
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
