require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const db = require('./models');
let key=process.env.OMDB_API_KEY;

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
  console.log(req.body);
  res.render('index');
});

app.get('/results',(req,res)=>{
  console.log(`http://www.omdbapi.com/?apikey=${key}&t=${req.query.q}`);
  axios.get(`http://www.omdbapi.com/?apikey=${key}&t=${req.query.q}`)
        .then((response)=>{
          res.render('results', {movie: response.data});
        })
  
});
/*
app.get('/movies', (req,res)=>{
    res.send('Test');
});
*/
app.get('/results/:id',(req,res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${req.params.id}`)
        .then((response)=>{
          console.log(req.params.id)
          res.render('detail', {movie: response.data});
        })
});

app.get('/faves', (req,res)=>{
    db.fave.findAll().then(faves=>{
      console.log(faves);
      res.render('faves',{movies: faves});
    }).catch(err=>{
      console.log(err);
    });
});

app.post('/faves',(req,res)=>{
  db.fave.create({
    title: req.body.title,
    imdbid: req.body.imdbid
  }).then(fave=>{
    res.redirect('/faves');
  }).catch(err=> {
    console.log(err);
    res.redirect('/faves');   
  }) 
});

app.listen(8000);
// We can export this server to other servers like this
