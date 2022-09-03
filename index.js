// Install and require packages
const express = require('express')
const axios = require('axios')

// config instance of express
const app = express()
const PORT = 8080

// set the view engine
app.set('view engine', 'ejs')

// define some routes

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/results', (req,res) => {
    console.log(req.query)
    const apiKey = `&apikey=e40f21b5`
    const url = `http://www.omdbapi.com/?t=${req.query.userInput}${apiKey}`
    axios.get(url)
        .then(response => {
            console.log(response.data)
            res.render('results.ejs', {
                input: req.query.userInput,
                movie: response.data
            })
        })
        .catch(console.error)
})



// listen on port

app.listen(PORT, () => {
    console.log(`listening to the sweet sounds of the galaxy on port ${PORT}`)
})