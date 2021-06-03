require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();
const PORT = 3000
// pulls private key from .env
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Home route with input form
app.get('/', (req, res) => {
    res.render('index')
})

// /results route which collects params from input form and uses to query
app.get('/results', (req, res) => {
  // add params into new object
  let newObject = {
    params: {
      // s is a required param per the OMDB documentation
      s: req.query.search,
      apikey: omdbApiKey
    }
  }
  // get data from database and return all results
  axios.get('http://www.omdbapi.com/', newObject)
    .then(resFromAPI => {
      let results = resFromAPI.data.Search
      console.log(resFromAPI.data)
      res.render('results.ejs', { results: results })
    })
    .catch(err => {console.log(err)})
});

// /detail route which uses param to query individual movie info
app.get('/detail/:imdbID', (req, res) => {
  let qs = {
    params: {
      // i is a required param per the OMDB documentation
      i: req.params.imdbID,
      apikey: omdbApiKey
    }
  }
  // get data from database and return selected data
  axios.get('http://www.omdbapi.com/', qs)
  .then(resFromAPI => {
    let movieData = resFromAPI.data
    console.log(resFromAPI.data)
    res.render('detail', {movieData: movieData})
  })
  .catch((err) => {console.log(err)})
})

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})

// on homepage create form for movie title input
    //submitting form should send to /results?q=star+wars

// write get route for /results
  // use axios module for OMDB API
  // send data to browser
  // render on results.ejs template

// create get route for /movies/:movie_id
  // make API call to retieve data
  // render on details.ejs
