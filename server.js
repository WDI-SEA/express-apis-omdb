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
// app.get('/', function(req, res) {
//   res.send('Hello, backend!');
// });
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/search', async (req, res) => {
  try {
      const searchUrl = `http://www.omdbapi.com/?t=${req.query.userInput}&apikey=${process.env.API_KEY}`
      const response = await axios.get(searchUrl)
      console.log(searchUrl)
      console.log(response)
      res.render('results.ejs', {
        title: response.data.Title,
        rating: response.data.Rated,
        year: response.data.Year

        })
  } catch (err) {
      console.log('t')
  }
})
// app.get('/search/details', (req, res) => {
//   axios.get(req.query.url)
//       .then(response =>  {
//           console.log(response.data)
//           res.render('details.ejs', {title: response.data.Title})
//       })

// })

// axios.get('http://www.omdbapi.com/?apikey=[f22f8b87]&/t=rocky')
//   .then(function (response) {
//     console.log(response);
//   })
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
