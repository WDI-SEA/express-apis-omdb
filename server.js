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
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/search', async (req, res) => {
  try {
      //route logic here
      const searchUrl = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
      const response = await axios.get(searchUrl)
      res.render('results.ejs', {
          people: response.data.results,
          input: req.query.userInput 
     })
  } catch(err) {
      console.log(err)
  }
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);


// We can export this server to other servers like this
module.exports = server;
