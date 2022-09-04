require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
const PORT = 8000;
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

app.get("/results", (req, res) => {
  let searchTerm = req.query.search;
  let url = "https://www.omdbapi.com/?s=" + searchTerm + "&apikey=2fdc7ef0 ";
  axios.get(url)
  // Sends the user to the results page
  .then(response => {
    res.render("results.ejs", 
		{
			data: response.data,
		});
	}).catch(console.warn);
})
// sends the user to the selected movie page
app.get("/movies/:id", (req, res) => {
  let movieId = req.params.id;
  let url = "https://www.omdbapi.com/?i=" + movieId + "&apikey=2fdc7ef0 ";
  axios.get(url)
  
  .then(response => {
    res.render("detail.ejs", 
    {
      data: response.data,
    });
  }).catch(console.warn);
})
// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 8000);

// We can export this server to other servers like this
module.exports = server;
