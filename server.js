const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();
require('dotenv').config();

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

app.use('/movies', require('./controller/moviesController'));

// Routes
app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/results', (req, res) => {
	const url = `http://www.omdbapi.com/?t=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`;
	axios.get(url).then((response) => {
		const searchResults = response.data;
		res.render('results.ejs', { results: searchResults });
	});
});

// The app.listen function returns a server handle
const server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
