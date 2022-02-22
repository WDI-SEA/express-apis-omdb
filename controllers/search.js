const express = require('express')
const router = express.Router()
const axios = require('axios')
// const { response } = require('express')
require('dotenv').config()

let search

router.get('/', (req, res) => {
    const url = `http://www.omdbapi.com/?s=${req.query.search}&apikey=${process.env.OMDB_API_KEY}`
    axios.get(url)
        .then(response => {
            const searchResults = response.data.Search
            search = req.query.search
            // id = response.data.Search.imdbID
            res.render('results.ejs', { results: searchResults })
            // res.send(searchResults)
        })
        // .catch(console.log(err))
})

router.get('/movies/:movie_id', (req, res) => {
    const url = `http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`
    axios.get(url)
        .then(response => {
            const searchResults = response.data
            const ratings = response.data.Ratings
            res.render('detail.ejs', {results:searchResults, rates:ratings, title:search})
            // res.send(searchResults)
            // res.render('detail.ejs', {results:req.params.movieId})
        })
})

module.exports = router