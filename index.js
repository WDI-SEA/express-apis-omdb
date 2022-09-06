// required packages
const express = require('express')
const axios = require('axios')
const ejs = require('express-ejs-layouts')
const { response } = require('express')

// configure
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(ejs)

// URLS
const API_Key = process.env.API_KEY


// ROUTES
// home route
app.get('/', (req, res)=>{
    res.render('index')
})

// list of movies 
app.get('/results', (req, res)=>{

  const url = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${API_Key}`
    // AXIOS REQUESTS
    // gives list of movies
 axios.get(url)
   .then(response =>{
        console.log(response.data)
       res.render('results', {
        input: req.query.userInput,
         movies: response.data.Search
        })
     })

 })
// gives movie details
  app.get("/movies/:movie_id", (req, res)=>{
     console.log(req.query)
   const movie_id = req.params.movie_id
   const url = `https://www.omdbapi.com/?i=${movie_id}&apikey=${API_Key}`
     console.log(url)
 axios.get(url)
   .then(response =>{
     console.log(response.data)
   res.render('detail.ejs', {
       data: response.data,
      title: response.data.Title
    })
  })
   .catch(console.warn) 
 })



// app.get('/detail', (req, res) =>{
//     res.render('detail.ejs')
//     const imdbID = `https://www.imdb.com/title/${movie.imdbID}` 
//     const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${API_Key}`
//    axios.get(url)
//     .then(response =>{
//       res.render("detail.ejs",{
//          imdbID: response.data.Search.imdbID,
//           })
//     })

// })


// LISTEN ON PORT
app.listen(PORT, ()=>{
    console.log(`cruising together on port ${PORT}`)
})

