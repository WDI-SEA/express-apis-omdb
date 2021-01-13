//import nmp modules necessary
const EXPRESS = require('express');
const AXIOS = require('axios');
require('dotenv').config();
const FS = require('fs');
const { Router } = require('express');

//initialize our express server
const ROUTER = EXPRESS.Router();

//stud out a home route that returns hellos world
ROUTER.get('/', (req, res) => {
    res.render('index.ejs')
})

ROUTER.post('/results', (req, res) => {
    console.log(process.env.OMDB_API_KEY)
    console.log(req.body)
        AXIOS.get(`http://www.omdbapi.com/?s=${req.body.Title}&apikey=${process.env.OMDB_API_KEY}`)
            .then(response => {
                console.log(response.data)
                res.render('results.ejs', {movies: response.data.Search})
            }).catch(error=> console.log(error))
})

module.exports = ROUTER;