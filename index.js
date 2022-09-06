// required packages
const express = require('express')
const axios = require('axios')

// config an instance of express
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')

const API_KEY = '218c7fd2'

// define some routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/search', (req, res) => {
    // take in form data
    // GET forms create query strings
    console.log(req.query)
    const url = `http://www.omdbapi.com/?t=${req.query.userInput}&apikey=${process.env.API_KEY}`
    // make a http request to the OMDB
    axios.get(url)
        .then(response => {
            // render the data to the user
            console.log(response.data)
            res.render('results.ejs', {
                input: req.query.userInput,
                movie: response.data
            })
        })
        .catch(console.error)
})
// const url = `http://www.omdbapi.com/?t=${req.query.userInpute}&apikey=${API_KEY}`

// Ye apikey= 822d2ced

// listen on a port
app.listen(PORT, () => {
    console.log(`aaaaarrrrrrghgghgrgrhgrgr ${PORT}`)
})