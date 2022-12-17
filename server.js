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
  res.render('index.ejs')
});

// GET /results -- take in data from form and render API response
app.get('/results', async (req, res) => {
  try {
    // query strings come in on the req.query
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.title}`

    const response = await axios.get(url)
    // res.json(response.data)
    res.render('results.ejs', {
      films: response.data.Search,
      title: req.query.title
    })
  } catch (err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  }
})

// GET /movies/:imdbID -- renders a single movies's detail
app.get('/movies/:imdbID', async (req, res) => {
  try {
    // url route parameters come in on the req.params
    const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.imdbID}`
    console.log(req.params)
    const response = await axios.get(url)
    // res.json(response.data)
    res.render('detail.ejs', {
      film: response.data
    })
  } catch(err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  }
})

// GET /faves -- READ all faves from the database
app.get('/faves', async (req, res) => {
  try {
    const allFaves = await db.fave.findAll()
    res.render('faves.ejs', {
      allFaves: allFaves
    })
  } catch (err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  }
})

// POST /faves -- CREATE a new fave in the database
app.post('/faves', async (req, res) => {
  try {
    // create a new fave in the db
    const returnArray = await db.fave.findOrCreate({
      where: {
        imdbID: req.body.imdbID
      },
      defaults: {
        title: req.body.title
      }
    })
    console.log(returnArray[0], returnArray[1])
    const [fave, created] = returnArray
    console.log(fave, created)
    // redirect to /faves to show the user their faves
    res.redirect('/faves')
  } catch (err) {
    console.log('🤬🤬🤬🤬🤬', err)
    res.status(500).send('api error 🤬')
  } 
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
