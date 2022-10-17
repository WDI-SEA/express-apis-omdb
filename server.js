require('dotenv').config();
const express = require('express');
const axios = require('axios');

const ejsLayouts = require('express-ejs-layouts');
const app = express();
//whatever process.env.PORT is defined use it 
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
  res.render("index")
});
app.get('/results', function(req, res) {
  let actualRes = req.query.movName
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${actualRes}`)
  .then(function (response) {
    res.render("results",{resultTitle: response.data.Title, imdbID: response.data.imdbID})
  })
  app.get("/movies/:idx",(req,res)=>{
    
    axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.idx}}`)
  .then(function (response) {
    console.log(response)
  
    res.render("detail",{result:"hi"})
  })
  })

});

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000,()=>{
  console.log("LETS GOOOOO")
});

// We can export this server to other servers like this
module.exports = server;
