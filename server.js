require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts')

const PORT = 3001
const omdbApiKey = process.env.OMDB_API_KEY 
app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
// Adds some logging to each request
app.use(require('morgan')('dev'));

//create a home route
//create a home route
app.get('/', (req, res) => {
  res.render('index.ejs')
})
// GET (read) movie results from input form
app.get('/results', (req, res) => {
  let newObject = {
    params: {
      s: req.query.search,
      apikey: omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com/', newObject)
  .then(resFromApi => {
    let results = resFromApi.data.Search
    res.render('results', { results: results })
    let imdbRes = resFromApi.data.imdbID
    res.render('results', { movies: imdbID})
    })
  .catch(err => {console.log(err)})
  })

//details
app.get('/detail/:imdbID', (req, res) => {
  let qs = {
    params: {
      i:req.params.imdbID,
      apikey: omdbApiKey,
    },
  }
  axios
    .get('http://www.omdbapi.com', qs)
    .then((resFromApi) => {
      let movieData = resFromApi.data
      console.log(movieData)
      res.render('detail', { q: movieData })
    })
    .catch((err) => {
      console.log(err)
    })
})


//open up a port for the app to listen on + define port
app.listen(PORT, () => {
  console.log("youre listening to the smooth sounds of a movie app🎞")
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
