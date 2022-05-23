//routing happens here
require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
require('dotenv').config()
console.log(process.env)
const { get } = require('express/lib/response');

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
//set up middleware
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// GET /search -- take a search from the user and render the results for them to se
app.get('/search', async (req, res) => {
	try {
		// route logic here
		const searchUrl = `http://www.omdbapi.com/?s=${req.query.userInput}${apikey}`
        console.log(searchUrl)
		const response = await axios.get(searchUrl)
        console.log(response.data.Search)

		res.render('results.ejs', {
			movies: response.data.Search,
			input: req.query.userInput
		})			
	} catch (err) {
		// error handling logic here
		console.log(err)
	}
})
//new route get movies by id
app.get('/details/:id', (req, res) => {
  console.log(req.params.id)
  axios.get(`http://www.omdbapi.com/?i=${req.params.id}${apikey}`)
    .then(response => {
      res.render('detail.ejs', { movie: response.data })
      // res.json(response.data)
    })
    .catch(console.log)
})
// We can export this server to other servers like this
module.exports = server;
