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

console.log("process.env:", process.env)

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

//initial API call
app.get('/results', (req,res)=>{
  // console.log(req.query)
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.userInput}`
  axios.get(url)
    .then(response =>{
      console.log(url)
      // console.log(response.data.Search)
      res.render('results.ejs', {
        input: req.query.userInput,
        movies: response.data.Search
      })
      
    })
    .catch(console.warn)

})

//second call for details
app.get('/movies/:movie_id', (req,res)=>{
  console.log(req.query)
  const movie_id = req.params.movie_id
  const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${movie_id}`
  console.log(url)
  axios.get(url)
    .then(response =>{
      // console.log(url)
      console.log(response.data)
      res.render('detail.ejs', {
        data: response.data,
        title: response.data.title
      })
      
    })
    .catch(console.warn)

})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);
console.log('server up')
// We can export this server to other servers like this
module.exports = server;
