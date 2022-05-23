// require packages
const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
// app config
const app = express()
const PORT = 2002
app.set('view engine', 'ejs')

// middlewares
app.use(ejsLayouts)
app.use(express.static('static'))

// routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/search', (req, res)=>{
    const searchUrl = `https://www.omdbapi.com/?s=${req.query.userInput}&apikey=${process.env.API_KEY}`
    axios.get(searchUrl)
        .then(response => {
            console.log(response.data.Search)
            res.render('results.ejs', {
                searches: response.data.Search,
                input: req.query.userInput,
            })
            
        })
        .catch(console.warn)
})
app.get('/movies/:movieId', (req, res) => {
    const searchUrl = `https://www.omdbapi.com/?i=${req.params.movieId}&apikey=b4e369a1`
    
    axios.get(searchUrl)
    
        .then(response => {
            
            console.log(response.data)
            res.render('detail.ejs', {
                data: response.data,
                input: req.query.userInput,
                
            })
            
        })
        .catch(console.warn)
})
//listen to the port
app.listen(PORT, () => {
    console.log(PORT,'linked')
})