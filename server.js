require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
let key=process.env.OMDB_API_KEY;

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
app.get('/', function(req, res) {
  console.log(req.body);
  res.render('index');
});

app.get('/results',(req,res)=>{
  console.log(`http://www.omdbapi.com/?apikey=${key}&t=${req.query.q}`);
  axios.get(`http://www.omdbapi.com/?apikey=${key}&t=${req.query.q}`)
        .then((response)=>{
          res.render('results', {movie: response.data});
        })
  
});

// The app.listen function returns a server handle
app.listen(8000);

// We can export this server to other servers like this
