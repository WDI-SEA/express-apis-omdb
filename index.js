// Install and require packages
const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
// config instance of express
const app = express()
const PORT = 8080

// set the view engine
app.set('view engine', 'ejs')
app.use(ejsLayouts);
// define some routes
const apiKey = `&apikey=e40f21b5`

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/results', (req,res) => {
    // console.log(req.query)
    const url = `http://www.omdbapi.com/?s=${req.query.userInput}${apiKey}`
    axios.get(url)
        .then(response => {
            console.log(response.data)
            res.render('results.ejs', {
                input: req.query.userInput,
                movie: response.data.Search,
            })
        })
        .catch(console.error)
})

app.get('/movies/:movie_id', (req, res) => {
    const url = `http://www.omdbapi.com/?i=${req.query}${apiKey}`
    axios.get(url)
    .then(response => {
        console.log(response.data)
        res.render('detail.ejs', {
            movie: response.data,
        })
    })
    .catch(console.error)
})



// listen on port

app.listen(PORT, () => {
    console.log(`listening to the sweet sounds of the galaxy on port ${PORT}`)
})