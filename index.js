const db = require('./models')
require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const API_KEY = process.env.API_KEY
app.set('view engine', 'ejs')
const ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.use(express.urlencoded({extended:false}))



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    console.log(req.query)
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
    .then(response => {
     
        console.log(response.data.Search)
        res.render("results", {movies: response.data.Search})
    })
})

app.get('/movies/:movies_id', (req, res) => {
    let movieid = req.params.movies_id;
    console.log(movieid)
    axios.get(`http://www.omdbapi.com/?i=${movieid}&apikey=${API_KEY}`)
    .then(response => {
      
        res.render("show", {movie: response.data})
    }) 
})

app.post('/faves', (req, res) => {
    console.log("This is req.body",  req.body)
    db.fave.create(req.body)
    
    .then(() => {
        res.redirect('/faves')
    }

    ).catch( (error) => {
        console.log(error)
    })
    

})

app.get('/faves', (req, res) => {
    db.fave.findAll().then(faves=>{
        
        res.render('faves.ejs', {faves} )
        // users will be an array of all User instances
      });
})

app.listen(3000, () => {
    console.log('3000 a go')
})