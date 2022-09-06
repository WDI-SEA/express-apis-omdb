

const express = require('express')
const axios = require('axios')
// const layoutEjs = require('express-ejs-layouts')

const app = express()
const PORT = 3005
app.set('view engine', 'ejs')
// app.use(layoutEjs)

const apiKey = `&apikey=5d49b2fb`

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/results', (req, res) => {
    const url = `http://www.omdbapi.com/?t=${process.env.API_KEY}`
    axios.get(url)
        .then(response => {
            console.log(response.data)
            res.render('./results.ejs', {
                input: req.query.userInput,
                movies: response.data.results,
            })
        })
})
// listen on a port
app.listen(PORT, () => {
    console.log(`MOIVE TIME ON PORT NUMBER: ${PORT}`)
})