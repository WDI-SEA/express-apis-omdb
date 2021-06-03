//Import Express
const express = require('express')
//Import axios
const axios = require('axios')
//Import AND config dotenv library
require('dotenv').config()
//PORT
const PORT = 3000
//Declare the app
const app = express()
//Import ejsLayouts
const ejsLayouts = require('express-ejs-layouts')
//Define API key var retreived from .env file
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine (Ability to use view folder and names)
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data (Ability to use <form>)
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware (ability to use ejs <%-Body>)
app.use(ejsLayouts);

// Routes
//Create home route
app.get('/', (req,res) => {
  //Use of ejs and ejs layouts below. You can just put index instead of index.ejs
  res.render('index')
})

//Create /results route
app.get('/results', (req, res) => {
  let newObject = {
    params:{
      s: req.query.search,
      apikey: omdbApiKey
    }
  }
  //ORIGINAL REQUEST for information
  axios.get('http://www.omdbapi.com/', newObject)
  //RESPONSE FROM API (ACCESS to informaiton)
      .then((resFromAPI) => {
          let movies = resFromAPI.data.Search
          res.render('results.ejs', {movies: movies})
      })
      .catch(err => {console.log(err)})
})



// Anna's solve
// Create /results route
// app.get('/results', (req, res) => {
//   // .search below is from the "name="search" from index.ejs form
//   let movieTitle = req.query.search
  
//   //ORIGINAL REQUEST for information, start with /? to start query &apikey
//   axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMDB_API_KEY}`)
//   //RESPONSE FROM API (ACCESS to informaiton)
//   .then((resFromAPI) => {
//     //console.log to see what data you're getting
//     console.log(resFromAPI.data)
//     let title = resFromAPI.data.title
//     let year = resFromAPI.data.Year
//     let plot = resFromAPI.data.Plot
//     let imdbID = resFromAPI.data.imdbID
//         //renders data into results.ejs
//         res.render('results', {title: title, year: year, plot: plot, imdbID: imdbID})
//       })
//       .catch(err => {console.log(err)})
// })




//Create /detail route
app.get('/detail/:imdbID', (req, res) => {
  let newObject = {
    params: {
      i: req.params.imdbID,
      apikey:omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com/', newObject)
  .then((resFromAPI) => {
    console.log(resFromAPI.data.Plot)
    let details = resFromAPI.data
    res.render('detail', {details: details})
  })
  .catch(err => {console.log(err)})
})

//open up a port for app to listen
app.listen(PORT, () => {
  console.log(`Working PORT: ${PORT}`)
})

