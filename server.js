require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

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
app.get('/',(req, res) => {
  res.render('index.ejs')
});

app.get('/results', async (req,res) => {
  try {
    // route logic here

    // SOMETHING TO DO TOMORROW CHANGE T TO S SO ITS NOT SUPER SPECIFIC
    const searchUrl = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
    // console.log(process.env)
    // console.log(searchUrl)
    const response = await axios.get(searchUrl)
    // console.log(response.data)
    // const movieDetails = Object.entries(response.data)
    res.render('results.ejs', {
      movie: response.data.Search
      // input: req.query.userInput,
    })
    // console.log(response.data)
  } catch (err) {
    // error handling logic
  }
})


app.get('/result/detail', async (req,res) => {
  try {
    // axios.get(req.query.url)
    const idURL = `http://www.omdbapi.com/?i=${req.query.id}&apikey=${process.env.API_KEY}`
    const response = await axios.get(idURL)
    // console.log(idURL)
     const movieDetails = Object.entries(response.data)
    //  console.log(movie)
    //  console.log(theDetailArr)
    res.render('detail.ejs', {
      movie: response.data,
      movieDetails
    })

  } catch (err) {

  }
})








// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
