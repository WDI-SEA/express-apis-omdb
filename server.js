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

// ROUTES
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// ASYNC ROUTE lets you use async/await in an express route
app.get('/results', async(req, res) => {
    try {
      // define a var that whatever bring back from response
      const response = await axios.get(`http://www.omdbapi.com/?s=${req.query.movieSearch}&apikey=${process.env.OMDB_API_KEY}`)
      res.render('results.ejs', { movies: response.data.Search })
    } catch (error) {
      console.log(error)
    }
})

app.get('/details/:id', (req, res) => {
  console.log(req.params.id)
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
      res.render('detail.ejs', { movie: response.data })
    })
    .catch(console.log)
})

// GET ROUTE/FAVES -- READ all faves from the db
app.get('/faves', async (req, res) => {
  try {
      const allFaves = await db.fave.findAll()
      res.json(allFaves)
  } catch (err) {
    console.log(err)
  }
})

// POST ROUTE/FAVES -- CREATE a fave and redirect to /faves -- redirect to another route -- res.send sends a string
app.post('/faves', async (req, res) => {
  try {
    await db.fave.create({
      title: req.body.title,
      imdbId: req.body.imdbId
    })
// perform get request
    res.redirect('/faves')
  } catch (error) {
    console.log(error)
  }
})



// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

