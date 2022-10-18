require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
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
//Home Route for Search
app.get('/', function(req, res) {
  res.render('index');
})

//Show the results of show
app.get('/results', (req, res)=>{
  let userInput = req.query.searchMovie
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${userInput}`)
  .then((response)=>{
    let movie = response.data.Search
    // console.log(response.data.Search)
    console.log("user input " + userInput)
    
    if(userInput){
      movie = movie.filter(title=>{
         return title.Title.toLowerCase().includes(userInput.toLowerCase())
      })
  }
  res.render('results', {movies:movie, userInput})

  })
  .catch(error=>{
    console.log(`Error!: ${error}`)
  })
  
})


//movie details
app.get('/movies/:movie_id', (req, res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${req.params.movie_id}`)
  .then((response)=>{
    console.log(response.data)
    res.render('detail', {mDetails:response.data})
  })

})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
