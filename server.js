require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios');
const app = express();
const db = require('./models')

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
//Home Route for Search
app.get('/', function(req, res) {
  res.render('index');
})

//Show the results of show
app.get('/results', (req, res)=>{
  let userInput = req.query.searchMovie
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${userInput}`)
  .then((response)=>{
    let movie = response.data.Search
    // console.log(response.data.Search)
    console.log("user input " + userInput)
    res.render('results', {movies:movie, userInput} )

  })
  .catch(error=>{
    console.log(`Error!: ${error}`)
  })
  
})


//movie details
app.get('/movies/:movie_id', (req, res)=>{
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${req.params.movie_id}`)
  .then((response)=>{
    console.log(response.data)
    res.render('detail', {mDetails:response.data})
  })

})

//Add To Fave Routes:
app.post('/faves', (req,res)=>{
console.log(`Movie Title: ${req.body.title}`)
console.log(`Movie Id: ${req.body.imdbid}`)
  async function addToFaves(){
    try{
        const newFave = await db.fave.create({
            title: req.body.title, 
            imdbid: req.body.imdbid
        }, res.redirect('/faves'))
        
        console.log("Added to Fave", newFave)
    }
    catch(err){
        console.log(err)
    }
}
addToFaves()
})


app.get('/faves', (req,res)=>{

  async function readAllFavMovies() {
    try {
      const allFave = await db.fave.findAll({
        attributes: ['title', 'imdbid']
      })
      res.render('faves', {allFave})
      console.log(allFave);
    } catch (error) {
      console.log(error)
    }
  }
  readAllFavMovies()

})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
