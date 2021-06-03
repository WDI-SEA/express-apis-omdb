// import express
const express = require('express')
//import axios
const axios = require('axios')
// import and conifg dotenv library
require('dotenv').config() 

//define PORT
const PORT = 3000

//define API key var
const omdbApiKey = process.env.OMDB_API_KEY

//declare the app
const app = express()

//create a home route
app.get('/', (req, res) => {
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdbApiKey}`)
        .then((resFromAPI) =>{
            console.log(resFromAPI)
            res.render('.views/results.ejs', { resFromAPI })
        })
        .catch(err => {console.log(err)})
})

//open up port for the app to listen on + define port
app.listen(PORT, () => {
    console.log("welcome to our show ")
})