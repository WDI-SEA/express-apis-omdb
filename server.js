require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const bodyParser = require("body-parser"); 
// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(bodyParser.urlencoded({extended: true}));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
const db = require("./models");

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  // res.send('Hello, backend!');
  console.log(process.env.RANDOM_ENV_VAR);
  res.render('index');
});

app.get('/results', (req,res)=>{
  axios.get(`http://www.omdbapi.com/?&apikey=${process.env.API_KEY}&s=${req.query.s}`)
  .then(function (response) {
    res.render('results', {movies: response.data.Search})
  })
})

app.get('/movies/:id', (req,res)=>{
  axios.get(`http://www.omdbapi.com/?&apikey=${process.env.API_KEY}&i=${req.params.id }`)
  .then(function(response){
    res.render('detail', {movie: response.data})
  })
})


app.get('/faves', (req,res)=>{
  try{
    db.fave.findAll()
    .then( response=>{
      res.render('faves', {faves: response});
      // res.send(response);
    })
}catch (err){
    console.log(err);
}
})

app.post('/faves', (req,res)=>{
    try{
        db.fave.create({title: req.body.title, imdbid: req.body.imdbid})
        .then( response=>{
          res.redirect('/faves');
        })
    }catch (err){
        console.log(err);
    }
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
