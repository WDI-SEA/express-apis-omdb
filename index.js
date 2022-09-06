require('dotenv').config();
const { default: axios } = require("axios")
const express = require("express")

const app = express()
const PORT = 3001

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index.ejs")
})
console.log(process.env)

app.get("/results", (req, res) => {
    console.log(req.query)
    const url = `http://www.omdbapi.com/?t=${req.query.q}&apikey=${process.env.API_KEY}&`
    axios.get(url)
        .then(response => {
            // console.log(response.data)
            
            res.render("results.ejs", {
                input: req.query.q,
                information: response.data
            })
        })
        .catch(console.error)
})

app.get("/movies/:movie_id", (req, res) => {
    console.log(req.query)
    const url = `http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.API_KEY}&`
    axios.get(url)
        .then(response => {
            console.log(response.data)
            res.render("detail.ejs", {
                input: req.query.i,
                information: response.data
                
            })
        })
})


app.listen(PORT, () =>{
    console.log("server is up")
})
