require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
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
  console.log(process.env.RANDOM_ENV_VAR)
  // res.send('Hello, backend!');
  res.render('index')
});



app.get('/results',(req , res)=>{
  let Search = req.query.s
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${Search}`)
    .then((response)=>{
      // res.send(response.data)
        res.render ('results',{ movieArrya:response.data.Search})
    })

})

app.get('/movies/:movie_id',(req , res)=>{
  let id = req.params.movie_id
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}`)
    .then((response)=>{
      // res.send(response.data)
        res.render ('detail',{ movies:response.data})
    })

})


// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
