//dot env 
require('dotenv').config();


const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const db = require('./models')

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
  res.render('index');
});
app.get('/results', function(req,res) {
  const searchURL = `https://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.API_KEY}`
  axios.get(searchURL)
  .then(response => {
    
    console.log(response.data.Search)
    res.render('results', {
      query: req.query.q, 
      movies: response.data.Search
      
    })
  })
  .catch(err => {
    console.log(err)
    res.send('Error. No movies found.')
  })
  
})

app.get('/details/:movie_id', (req,res) => {
  console.log(req.params, 'query')
  const detailsURL = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
  axios.get(detailsURL) 
  .then(response => {
    console.log(response.data)
    res.render('detail', {
      movie : response.data
    })
  })
  .catch(err => {
    console.log(err)
  })
})
app.post('/faves', async (req,res) => {
  // create a new fave in the db
  await db.fave.create({
    title: req.body.title,
    imdbid: req.body.imdbid
  })
  // redirect to show all faves
  res.redirect('/faves')
})
app.get('/faves', async (req,res) => {
  // get all faves from db 
  const faves = await db.fave.findAll()
  res.render('faves', {
    faves: faves
  })
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3001);

// We can export this server to other servers like this
module.exports = server;
