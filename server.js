require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios=require('axios');
const { response } = require('express');
// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
require('dotenv').config()
const API_KEY=process.env.API_KEY
// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index')
});
app.use('/results',(req,res)=>{
 console.log(req.query)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.SearchText}`)
  .then(response=>{
    let dataJson=response.data.Search
    //res.send(dataJson)
    console.log(dataJson)
    res.render('results',{response:dataJson})
  })
})
app.use('/movies/:movie_id',(req,res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
  .then(response=>{
    console.log(response.data)
    res.send(response.data)
  })

})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
