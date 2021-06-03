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
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
      .then((resFromAPI) => {
          console.log(resFromAPI.data.Title)
          res.send(resFromAPI.data.Title)
      })
      .catch(err => {console.log(err)})
})
// GET /movieResults
app.get('/results', (req, res) => {
  axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
      .then((resFromAPI) => {
          console.log(resFromAPI.data)
          res.send(resFromAPI.data)
      })
      .catch(err => {console.log(err)})
})

// GET /moveResults/:id -- READ specific movie details


// The app.listen function returns a server handle
app.listen(4000, () => {
  console.log("Can you hear me now???")
});



