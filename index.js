const db = require('./models')
const axios = require('axios')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
//make sure you've run 'npm i dotenv' in the terminal
require('dotenv').config()
const API_KEY = process.env.API_KEY

//vv to use ejs (after npm i ejs) then create a views folder with index.ejs inside)
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index')
})
//vv paired with line 4 from index.ejs

app.get('/results', (req, res) => {
    console.log(req.query.searchTerm)
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + req.query.searchTerm)
    .then(response => {
        console.log(response.data)
        res.render('results', {movies: response.data.Search})
    }) 
})

app.get('/movies/:movie_id', (req, res)=>{
    axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&i=' + req.params.movie_id)
    .then(response => {
        res.render('detail', {movie: response.data})
    }) 
    
})

// post to faves

app.post('/faves', (req, res)=>{
    db.fave.create({
        title: req.body.title,
        imdbid: req.body.imdbid
    }).then(createdFav=>{
        console.log(createdFav)
        res.redirect('/faves')
    })
})

app.get('/faves', (req, res)=>{
    db.fave.findAll().then(faves=>{
        res.render('faves.ejs', {faves: faves})
    })
})

app.listen(3000)