require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
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
  console.log(process.env.RANDOM_ENV_VAR)
  // res.send('Hello, backend!');
  res.render('index.ejs');
});

app.get('/results', function(req, res) {
  // req.query
  console.log(req.query)
  // let results
  axios.get(`http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.OMDB_API_KEY}`)
  .then(results=>{
    console.log(results.data)
    res.render('results.ejs', {results: results.data.Search})
  })
  .catch(err=>{
    console.log("oop! there was an issue retrieving API data!")
  })

});


app.get('/movies/:id', (req, res)=>{
  console.log(req.params)
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`)
  .then(movieDetails=>{
    console.log(movieDetails.data)
    res.render('detail.ejs', movieDetails.data)
  })
  .catch(err=>console.log(err))
})


app.post('/detail.ejs',(req,res)=>{

  
  res.redirect('/faves');
})

// The app.listen function returns a server handle
const server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
