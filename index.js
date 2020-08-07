// user want to go to a home page to search a database full of movies.
// user want to see movie results based on my search query.
// user, want to pick a movie result and see detailed 
// information about the movie.

require('dotenv').config()

const express = require('express')
const axios = require('axios')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('static'))

app.get('/', (req, res) =>{
    


    res.render('index')
})
    



app.listen(8000)
