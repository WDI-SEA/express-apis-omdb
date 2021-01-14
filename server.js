require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios=require('axios');
const { response } = require('express');
const db = require('./models')
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
app.get('/results',(req,res)=>{
 console.log(req.query)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.SearchText}`)
  .then(response=>{

    console.log(response.data)
    let dataJson=response.data.Search
    //res.send(dataJson)
    res.render('results',{response:dataJson})
  })
})
app.get('/movies/:movie_id',(req,res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
  .then(response=>{
    console.log(response.data)
    res.send(response.data)
  })

})

app.post('/:title/:movie_id',(req,res)=>{
  console.log("post")
  console.log(req.params.title)
  console.group(req.params.movie_id)
  db.fave.create({
    title:'friends'
  }).then(movieFave=>{
    console.log("hello post")
  })
  db.fave.findAll().then(faves=>{
    console.log("helloooooooo")
    // console.log(faves);
    
    // console.log(users[0].title)
    // users will be an array of all User instances
  })
  res.send('hi')
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
