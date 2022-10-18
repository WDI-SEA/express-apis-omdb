require('dotenv').config();
const express = require('express');
const request = require('request')
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
app.get('/', function(req, res) {
  console.log(process.env.OMDP_API_KEY)

  request(`http://www.omdbapi.com/?apikey=[${process.env.OMDP_API_KEY}]&`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('request error')
      res.send(body)
    }
    res.render('index.ejs');
  })

});

app.get('/results', function(req, res) {
  // let movieFilter = req,query.movieFilter

  res.render('results.ejs')
})








// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
