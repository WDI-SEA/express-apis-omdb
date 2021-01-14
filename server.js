require('dotenv').config();
const axios = require('axios')
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models')
const methodOverride = require('method-override')
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
//Method override for form data
app.use(methodOverride('_method'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

let apiKey = process.env.apiKey

// Routes
app.get('/', function(req, res) {
  res.render('index')
 
});

// Routes
app.get('/results', function(req, res) {
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${req.query.searchTerm}`)
  .then((response) => {
    res.render('results', {items: response.data.Search})
  })
});

app.get('/movie/fave', function(req, res) {
  db.movie.findAll().then(movies=>{
    console.log(movies)
    res.render('faves', {faves: movies})
  })
})

app.get('/movie/:movie_id', function(req, res) {
  console.log(req.params.movie_id)
  axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${req.params.movie_id}`)
  .then((response) => {
    res.render('detail', {data: response.data})
  })
});

app.put('/movie/fave/:movie_id', function(req, res) {
    db.movie.create({
      title: req.body.title,
      imdbid: req.body.id,
  }).then(createdUser => {
      console.log(createdUser)
      res.redirect('/movie/fave')
      //process.exit()
  })
})

app.delete('/movie/fave/delete/:movie_id', function(req, res) {
    console.log('delete')
      db.movie.destroy({
        where: { imdbid: req.params.movie_id }
    }).then(numRowsDeleted=>{
        console.log(numRowsDeleted)
        res.redirect('/movie/fave')
        //process.exit()
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, ()=> {
  console.log('Listening on port 3000')
});

// We can export this server to other servers like this
module.exports = server;
