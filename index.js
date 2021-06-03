const express = require('express')
const axios = require('axios')
require('dotenv').config()
const app = express()
const layouts = require('express-ejs-layouts')
const { response } = require('express')
const PORT = 3000
const omdbApiKey = process.env.OMDB_API_KEY

app.set('view engine', 'ejs')
app.use(layouts)


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/results', (req, res) => {
    console.log(omdbApiKey)
    console.log(req.query)
    axios.get(`http://www.omdbapi.com/?t=${req.query.Title}&apikey=${omdbApiKey}`)
        .then((response) => {
            console.log(response.data)
            res.render('results', response.data)
        })
        .catch(err => {console.log(err)})
})

app.get('/movies/:movie_id', (req, res) => {
    console.log(req.params)
    axios.get(`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${omdbApiKey}`)
    .then((response) => {
        console.log(response.data)
        res.render('detail', response.data )
    })
})

app.listen(PORT, () => {
    console.log("Success!")
})