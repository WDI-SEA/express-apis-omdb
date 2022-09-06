
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

const PORT = 8080

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
console.log('process.env:', process.env)
// require('server')
require('dotenv').config();

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/results', (req,res) => {
  // console.log(req.query)
  if(req.query.userInput === '') {
      res.render('index.ejs')
  }
  const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
  axios.get(url)
      .then(response => {
          console.log(response.data)
          res.render('results.ejs', {
              input: req.query.userInput,
              movie: response.data.Search,
          })
      })
      .catch(console.error('go back to homepage son'))
})

app.get('/movies/:movie_id', (req, res) => {
  const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
  axios.get(url)
  .then(response => {
      console.log(response.data)
      res.render('detail.ejs', {
          movie: response.data,
      })
  })
  .catch(console.error('go back to homepage son'))
})



// listen on port

// app.listen(PORT, () => {
//   console.log(`listening to the sweet sounds of the galaxy on port ${PORT}`)
// })

var server = app.listen(process.env.PORT || 8080);

module.exports = server;