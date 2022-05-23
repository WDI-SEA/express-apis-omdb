require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const omdb = require('omdb')
console.log(process.env)
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
  res.render('index.ejs')
});

// search route
app.get('/search', async (req, res)=>{
  try{
    const searchUrl = `http://www.omdbapi.com/?apikey=1a0630f7&s=${req.query.userInput}`
    const response = await axios.get(searchUrl)
    // console.log(response.data.Search)
    res.render('results.ejs', {
      movies: response.data.Search,
      input: req.query.userInput
    })
  } catch (err){
    console.warn(err)
  }
})


app.get('/movies/:movie_id', async (req, res)=>{
  // console.log(req.params.movie_id)
  try{
    const searchUrl = `http://www.omdbapi.com/?apikey=1a0630f7&i=${req.params.movie_id}`
    const response = await axios.get(searchUrl)
    // console.log(searchUrl)
    // res.render('detail.ejs', {movie: response.data})
    // console.log(response.data)
    axios.get(searchUrl)
      .then(response=>{
        console.log(response.data)
        res.render('detail.ejs', {movie: response.data})
      })
  } catch (err){
    console.warn(err)
  }
})

// The app.listen function returns a server handle
 const server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
