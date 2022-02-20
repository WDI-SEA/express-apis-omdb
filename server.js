require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

// const url = `http://www.omdbapi.com/?t=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`

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
app.get('/',(req,res)=>{
  res.render('index.ejs')
})

app.get('/results',(req,res)=>{
  const url = `http://www.omdbapi.com/?s=${req.query.s}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response=>{
        console.log(response.data.Search)
        const searchResults = response.data.Search
        // res.send(searchResults)
        res.render('results.ejs', {results: searchResults})
        
    })
    .catch()
})

app.get('/movies',(req,res)=>{
  const url = `http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.OMDB_API_KEY}`
  axios.get(url)
    .then(response=>{
        console.log(response.data)
        const detailsResults = response.data
        // res.send(detailsResults)
        res.render('detail.ejs', {results: detailsResults})
    })
    .catch()
})



// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000,err=>{
  if (err) console.log(err)
  console.log('GOGOGOGOGOGOGOG')
});

// We can export this server to other servers like this
module.exports = server;
