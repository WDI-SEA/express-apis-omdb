const axios = require('axios')
const express = require('express')
let app = express()
require('dotenv').config()
const API_KEY = process.env.API_KEY
const db = require("./models")


// middleware
app.set('view engine','ejs')
// allow to get the req.body
app.use(express.urlencoded({extended:false}))



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

app.get('/faves', (req,res)=>{
    db.fave.findAll().then(titles =>{
    console.log(titles)
    console.log('entrou2')
    //  res.sendStatus(200)
    res.render('faves',{titles})
    // process.exit()
    
})
})

app.post('/faves',(req,res)=>{
    db.fave.create({
    title: req.body.title,
    imdbid: req.body.imdbid,
}).then(createdUser =>{
    console.log(createdUser)
    console.log('entrou1')
    res.redirect('/faves')
    // process.exit()        
})
// console.log(req.body)
})

app.listen(3000,()=>{
    console.log('Listening on that port')
} )