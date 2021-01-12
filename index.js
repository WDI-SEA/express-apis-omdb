const axios = require('axios')
const express = require('express')
const app = express()
//make sure you've run 'npm i dotenv' in the terminal
require('dotenv').config()
const API_KEY = process.env.API_KEY

//vv to use ejs (after npm i ejs) then create a views folder with index.ejs inside)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})
//vv paired with line 3 from index.ejs
app.get('/results', (req, res) => {
    console.log(req.query.searchTerm)
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + req.query.searchTerm)
    .then(response => {
        res.send(response.data)
    }) 
})

app.listen(3000)