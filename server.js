require('dotenv').config();
const express = require('express');
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const app = express();

let API_KEY = process.env.API_KEY

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


app.get('/', (req, res)=>{
  let qs = {
    params:{
      s: 'movie',
      apikey: API_KEY
    }
  }
    axios.get('http://www.omdbapi.com', qs)
    .then(function(response){
      console.log(response.data);
      let movie = reponse.data.Search
      res.render('home', {movie})
    })
    .catch(err =>{
      console.log(err)
    })
})

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/movies/:id', (req, res)=>{
  let movie = JSON.parse(movie)
  let movieIndex =parseInt(req.params.id)
  res.render('movie/detail', {

  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
