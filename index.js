// user want to go to a home page to search a database full of movies.
// user want to see movie results based on my search query.
// user, want to pick a movie result and see detailed 
// information about the movie.

require('dotenv').config()
let API_KEY = process.env.API_KEY
const express = require('express')
const axios = require('axios')
const { request } = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('static'))

app.get('/', (req, res) =>{
    res.render('index')
})


    app.get('/results', (req, res) => {
        let searchM = req.query.searchM
      
        let qs = {
          params: {
            s: searchM,
            apiKey: API_KEY
          }
        }
      
        axios.get('http://omdbapi.com/', qs)
            .then(response => {
              console.log(response.data)
              let episode = response.data.Search
              res.render('results', {episode})
            })
            .catch(err => {
              console.log(err)
            })
    })

    



app.listen(8000)
