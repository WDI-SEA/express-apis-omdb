// required packages
const express = require('express')
const axios = require('axios')
const ejs = require('express-ejs-layouts')

// configure
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(ejs)

// URLS



// const details = movie detail

// ROUTES
// home route
app.get('/', (req, res)=>{
    res.render('index')
})
// list of movies 
app.get('/results', (req, res)=>{
   console.log(req.query.userInput)
    const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${API_Key}`
    // axios requests
axios.get(url)
    .then(response =>{
        console.log(response.data)
        res.render('results.ejs', {
         input: req.query.userInput,
         movies: response.data.Search
        })
    })

})

app.get('/details', (req, res)=>{
    res.render('details')
})

// LISTEN ON PORT
app.listen(PORT, ()=>{
    console.log(`cruising together on port ${PORT}`)
})

