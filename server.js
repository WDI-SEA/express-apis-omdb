require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();
//bring it in
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
  // res.send('Hello, backend!');
  //send to homepage
  res.render('index')
});

// route to handle query from search form
app.get('/results', (req, res)=> {
  let q = req.query.q
  var qs = {
    params: {
      s: q,
      apikey: process.env.API_KEY
    }
  };
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success, carefule to see how the data comes back
      let data = response.data.Search
      res.render('results', {data})
    })
})

// Make a new route on your backend: GET /movies/:movie_id
app.get('/movies/:movie_id', (req, res)=> {
  // new call to axios to get specific information on a movie
  let movie_id = req.params.movie_id
  var qs = {
    params: {
      i: movie_id,
      apikey: process.env.API_KEY
    }
  };
  // constructing a url
  // `http://www.omdbapi.com?i=${qs.params.i}&apikey=3040234`
  axios.get('http://www.omdbapi.com', qs)
    .then(function (response) {
      // handle success, carefule to see how the data comes back
      let data = response.data
      console.log(data)
      res.render('detail', {data})
    })
})

// post route to /faves from the favorite button
app.post('/faves', (req, res)=> {
  // with a post from a form we will have acess on req.body
  const favMovie = req.body
  // checks if this movie exists, if it is not it will create,
  // if it is it will return it
  db.favorite.findOrCreate({
    where: {
      imdbid: favMovie.imdbid,
      title: favMovie.title
    }
  })
  .then(([movie, didCreate])=> {
    if(didCreate) {
      console.log(movie.get())
    }
    res.redirect('/')
  })
  .catch( (err)=> {
    console.log(err)
  })

})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
