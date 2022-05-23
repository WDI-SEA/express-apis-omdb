require('dotenv').config();
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const { render } = require('express/lib/response');
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
  res.render('index.ejs')
});

 app.get('/search', async (req, res) => {
try {
    const searchURL = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
  const response = await axios.get(searchURL)
  res.render('results.ejs', {
       moviesSearch: response.data.Search,
  })
} catch (err) {
  console.warn(err)
}
 })

 app.get('/search/detail/:movie_id', async (req, res) => {
   try{
     const searchID = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.API_KEY}`
   const response = await axios.get(searchID)
   console.log(searchID)
      res.render('detail.ejs', {
        moviesId: response.data,
   })
   }catch (err) {
      console.warn(err)
   }
 })
// The app.listen function returns a server handle
// process.env.PORT says that use a server that is avaliable or use PORT 3000
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
