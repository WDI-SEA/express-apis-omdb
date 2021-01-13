const axios = require('axios')
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()
const API_KEY = process.env.API_KEY

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/results', (req, res) =>{
  console.log(req.query)
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
    // let data =JSON.parse(response.data)
    console.log(response.data.Search)
    res.render('results', {movies: response.data.Search})
  })
  .catch((error) => {
    console.log("Error! Please reload the page")
    res.sendStatus(500)
  })
})

app.get('/movies/:movie_id', (req, res) =>{
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
  .then(response => {
  console.log(response.data)
  res.render('detail', {movie: response.data})
  })
  .catch((error) => {
    console.log('Error! Please reload the page.')
    res.sendStatus(500)
  })
})

app.listen(3000,() => {
  console.log('AAAAAAAAAAAAAAAAHHH, Real Monsters!')
})