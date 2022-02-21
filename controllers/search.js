const express = require("express")
const router = express.Router()
const axios = require("axios")
require("dotenv").config

router.get("/movies/:movie_id", (req,res) => {
    const url = (`http://www.omdbapi.com/?i=${req.params.movie_id}&apikey=${process.env.OMDB_API_KEY}`)
    axios.get(url)
        .then((response) => {
            const results = response.data
            res.render("detail.ejs", {results: results})
        })

})

module.exports = router