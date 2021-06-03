require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Routes
// Home page with form to ask about specific movie
app.get('/', (req, res) => {
  res.render('home')
})

// GET /movieResults
app.get('/results', (req, res) => {
  let newObject = {
    params: {
      s: req.query.Search, 
      apikey: omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com/', newObject)
      .then((response) => {
          console.log(response.data)
          let results = response.data.Search
          res.render('results', {results: results} )
      })
      .catch(err => {console.log(err)})  
})

// GET /moveResults/:id -- READ specific movie details
app.get('/movies/:movies_id', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
      .then((res) => {
          console.log(res.data)
          res.render(res.data)
          // res.send(resFromAPI.data)
      })
      .catch(err => {console.log(err)})
      res.send("Am I even working??")
})

// The app.listen function returns a server handle
app.listen(4000, () => {
  console.log("Can you hear me now???")
});



