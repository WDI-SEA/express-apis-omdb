require('dotenv').config();
const axios = require('axios');
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
app.get("/",function(req,res){
  res.render("index.ejs")
  // console.log(req)
})

app.get('/results', async function(req, res) {
  // res.send('Hello, backend!');
  try {

    // console.log(req.query.userInput)
    const searchURL = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}` 
    const response = await axios.get(searchURL)
      console.log(response.data.Search)
    res.render("results.ejs",
     { movies: response.data.Search })
  } catch(err) {
    console.warn(err)
  }
});


app.get("/results/detail", async function(req,res){
  try {
    console.log(req.query.id)
    const idURL = `http://www.omdbapi.com/?i=${req.query.id}&apikey=${process.env.API_KEY}` 
    const response = await axios.get(idURL)
    // console.log(response.data)
    res.render("detail.ejs", {details: response.data})

  } catch(err) {
    console.warn(err)
  }
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
