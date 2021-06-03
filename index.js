require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const { response } = require('express');
const ejsLayouts = require('express-ejs-layouts')

const PORT = 3000
const omdbApiKey = process.env.OMDB_API_KEY 
app.set('view engine', 'ejs')
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

//create a home route
app.get('/', (req, res) => {
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
        .then((response) => {
            console.log(response.data.Title)
            res.render('index.ejs')
        })
        .catch(err => {console.log(err)})
})

//GET (read) movie results from input form
app.get('/results', (req, res) => {
    let newObject = {
        params: {
            s: req.query.search,
            apikey: omdbApiKey
        }
    }
    axios.get('http://www.omdbapi.com/', newObject)
        .then(resFromApi => {
            let results = resFromApi.data.Search
            res.render('results', { results: results })
        })
        .catch(err => {console.log(err)})
})

// POST movie 
//open up a port for the app to listen on + define port
app.listen(PORT, () => {
    console.log("youre listening to the smooth sounds of a movie app🎞")
})