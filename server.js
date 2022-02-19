require('dotenv').config()
const { default: axios } = require('axios')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const PORT1 = 8000

// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('static'))
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Enables EJS Layouts middleware
app.use(ejsLayouts)

// Adds some logging to each request
app.use(require('morgan')('dev'))

// Routes
// / home route
app.get('/', function(req, res) {
  // res.send('Hello, backend!')
  res.render('index.ejs')
});

// /results route - displaying found info
app.get('/results.ejs', (req,res)=>{
  const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${req.query.search}`
  axios.get(url)
    .then(response =>{
      const searchResults = response.data
      console.log(searchResults)
      // const imdbId = searchResults.imdbID
      console.log(searchResults.title)
      res.render('results.ejs',{results: searchResults})
    })
})



// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000)

app.listen(PORT1, ()=>{
  console.log(`you're now connected to the smooth vibes of port ${PORT1}`)
})

// We can export this server to other servers like this
module.exports = server
