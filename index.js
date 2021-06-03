const express = require('express')
const axios = require('axios')
require('dotenv').config()
const ejs = require('ejs')
const layouts = require('express-ejs-layouts')
const PORT = 7778
const app = express()
const fs = require('fs')
const omdbApiKey = process.env.OMDB_API_KEY

//middleware
app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(layouts)



app.get('/', (req, res) => {
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
        .then((response) => {
            console.log('check 1 2')
            res.render('index.ejs')
        })
        .catch (err => {console.log(err)})
})

app.get('/results', (req, res) => {
    const searchTitle = req.query.q
    axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTitle}`)
    .then((resApi) => {
    const apiData = resApi.data.Search
    JSON.stringify(apiData)
        console.log(apiData)
    res.render('results.ejs', {apiData})
    })
    .catch (err => {console.log(err)})
    console.log(searchTitle)
})



app.listen(PORT, () => {
    console.log(`You are tuning in to the sweet sounds of ${PORT}🎧`)
}) 