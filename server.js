require('dotenv').config();
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
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
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', function(req, res) {
  // store the value of the param string from req.query
  let movieTitle = req.query.q

  // use axios to make a call to OMDB API with query string
  axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMDB_API_KEY}`)
    .then(APIres => {
      let title = APIres.data.Title
      let year = APIres.data.Year
      let plot = APIres.data.Plot
      let imdbID = APIres.data.imdbID
      
      console.log(title, year, plot, imdbID)
      // res.render results to results.ejs
      res.render('results', {title: title, year: year, plot: plot, imdbID: imdbID})
    })
    .catch(err => {
      console.log(err)
    })
  })

    app.get('/movies/:movie_id', function(req, res) {
      // store movie_id to a variable
      let imdbID = req.params.movie_id
    
      // make an axios call to the OMDB API for full data obj for movie_id
      axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}`)
        .then(APIres => {
          res.send(APIres.data)
        })
        .catch(err => console.log(err))
    })


app.listen(process.env.PORT || 3000, () => {	
  console.log(`Listening to the sweet sweet sounds of ${process.env.PORT} in the morning ☕️.`)
})
