

// required packages
const express = require('express')
const axios = require('axios')
const { response } = require('express')

// config an instance of express
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')

// define some routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/search', (req, res) => {
    // take in form data
    // GET forms create query strings
    console.log(req.query)
    const url = `http://www.omdbapi.com/?s=${req.query.userInput}&page=1&apikey=6c951869`
    
    // make a http request to the omdbapi
    axios.get(url)
        .then(response => {
            console.log(response.data)
            // render the data to the user
            res.render('results.ejs', {
                input: req.query.userInput,
                movies: response.data.Search
            })
        }).catch(console.error)  
})

app.get('/search', (req, res) => {
    const url2 = `http://www.omdbapi.com/?s=${movie.imdbID}&apikey=6c951869`
    axios.get(url)
        .then(response => {
            // render the data to the user
            res.render('detail.ejs', {
                movies: movie.imdbID
            })
        }).catch(console.error)  



})
// listen on a port
app.listen(PORT, () => {
    console.log(`LIstening to ${PORT}`)
})