require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
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
pp.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/search', (req, res)=>{
  const searchUrl = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
  console.log(searchUrl)
  axios.get(searchUrl)
      .then(response => {
          console.log(response.data.Search)
          res.render('results.ejs', {
              searches: response.data.Search,
              input: req.query.userInput,
          })
          
      })
      .catch(console.warn)
})
app.get('/movies/:movieId', (req, res) => {
  const searchUrl = `https://www.omdbapi.com/?i=${req.params.movieId}&apikey=b4e369a1`
  
  axios.get(searchUrl)
  
      .then(response => {
          
          console.log(response.data)
          res.render('detail.ejs', {
              data: response.data,
              input: req.query.userInput,
              
          })
          
      })
      .catch(console.warn)
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
