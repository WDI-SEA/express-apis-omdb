require('dotenv').config(); //
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { response } = require('express');
// url with key
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
  res.render('index.ejs', {name: "Jamel", age: 5});
});

app.get('/results', (req, res)=>{
  // console.log(req.query)
  const url = `https://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.OMDB_ACCESS}`
  axios.get(url)
  .then(response =>{
    // console.log(response.data.Search[1].Title)

    const searchResults = response.data.Search //array in an object
    res.render('results.ejs', {movies: searchResults})
  })

})

app.get('/movies', (req, res)=>{
// console.log(req.query)
  const url = `https://www.omdbapi.com/?i=${req.query.id}&apikey=${process.env.OMDB_ACCESS}`
  axios.get(url)
  .then(response =>{
    let movieDetails = response.data
    res.render('detail',{movie: movieDetails})
    console.log(response.data)
  // res.render('detail.ejs', )

  })
})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Hello from port${process.env.PORT} 🎙`)
});

// We can export this server to other servers like this
module.exports = server;
