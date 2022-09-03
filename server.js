require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require("axios");
const app = express();
const MY_KEY = process.env.OMDB_API_KEY;    // Personal API key stored in git ignored .env file

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
	res.render("index.ejs");
});
app.get("/results", (req, res) =>
{
	const url = `https://www.omdbapi.com/?s=${req.query.q}&apikey=${MY_KEY}`;
	axios.get(url).then(response =>
	{
		res.render("results.ejs", 
		{
			searchResult: response.data,
			searchInput: req.query.q
		});
	}).catch(console.warn);
})
app.get("/movies/:movie_id", (req, res) =>
{
	const url = `https://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${MY_KEY}`;
	axios.get(url).then(response =>
	{
		res.render("detail.ejs", {movie: response.data});
	}).catch(console.warn);
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
