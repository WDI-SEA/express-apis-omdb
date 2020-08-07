require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();

let API_KEY = process.env.API_KEY;
//USING .env to hide our API key

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

app.get('/', (req, res) => {
  res.render('index');
})

// Routes
app.get('/results', function(req, res) {
  let q = req.query.q
  console.log('here is movieSearch '+q);
  let qs = {
    params: {
      s: q,
      apikey: API_KEY
    }
  }
  if(q) {
    axios.get('http://www.omdbapi.com', qs)
    .then((response) => {
      // console.log(response.data)
      let episodes = response.data.Search;
      res.render('results', {episodes});
    })
    .catch(err => {
      console.log(err);
    })
  }
});

app.get('/movies/:movie_id', (req, res) => {
  let imdbId = req.params.movie_id;
  let qs = {
    params: {
      i: imdbId,
      apikey: API_KEY
    }
  }
  axios.get('http://www.omdbapi.com', qs )
  .then(response => {
    let movieData =  response.data;
      res.render('detail', { data: movieData });
  })
  .catch(error => {
        console.log('Error', error);
  });
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
