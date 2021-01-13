const axios = require('axios')
const express = require('express')
let app = express()
require('dotenv').config()
const API_KEY = process.env.API_KEY

app.set('view engine','ejs')

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/results',(req,res)=>{
    // console.log(req.query.searchTerm)
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
    .then(response => {
        res.render('results',{results: response.data.Search})
    })
})

app.get('/movies/:movie_id',(req,res)=>{
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.movie_id}`)
    .then(response => {
        console.log(response.data)
        // res.sendStatus(200)
        res.render('detail',{data: response.data})
    })
})

app.listen(3000,()=>{
    console.log('Listening on that port')
} )