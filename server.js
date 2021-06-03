const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')
require('dotenv').config();
const PORT = 4010
//define API key var
const omdbApiKey = process.env.OMDB_API_KEY

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
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) => {
  //get to external location using axios
  let qs = {
    params: {
      s:req.query.q,
      apikey:omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com', qs)
    .then((response) => {
      let results = response.data.Search
      console.log(results)
      res.render('results', {movies:results})
    }) 
    .catch(err => {
      console.log(err)
    })
})

app.get('/movies/:id', (req, res) => {
  //get to external location using axios
  const id = req.params.id
  let qs = {
    params: {
      id:req.params.id,
      apikey:omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com/', qs)
    .then((result) => {
      console.log(result)
      res.render('detail')
    }) 
    .catch(err => {
      console.log(err)
    })
})

// app.get('/detail/:imdbID', (req, res) => {
//     let qs =  {
//       params: {
//         i: req.params.imdbID,
//         apikey:omdbApiKey,
//       }
//     }
//     axios.get('http://www.omdbapi.com/',qs)
//     .then((result) => {
//       let movieData = result.data
//       res.render('detail', {q:movieData })
//     })
//     .catch(err) => {
//       console.log(err)
// })
app.get('/detail/:imdbID', (req, res) => {
  let qs =  {
     params: {
      i: req.params.imdbID,
     apikey:omdbApiKey,
    }
  }
  axios.get('http://www.omdbapi.com/',qs)
  .then((result) => {
    let movieData = result.data
    res.render('detail', {q:movieData })
  })
  .catch(err => {
    console.log(err)
})
})




// The app.listen function returns a server handle
app.listen(PORT, () => {
  console.log('welcome to our very smooth port')
})
