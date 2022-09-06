const express = require('express')
require('dotenv').config();
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts');
const app = express()
const PORT = 3001

app.set('view engine', 'ejs');
app.use(ejsLayouts);

const apikey = process.env.API_KEY

console.log(apikey)

// http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}
// use ?s instead of t in the const url to get multiple options, then change the
// results based on on .Title link the user clicks


app.get('/', (req, res) => {
    res.render('index.ejs');
  });

app.get('/results', (req, res)=>{
  console.log(req.query)
  const url = `http://www.omdbapi.com/?s=${req.query.userInput}&apikey=${apikey}`
  axios.get(url)
    .then(response=>{
      console.log(response.data)
      res.render('results.ejs', {
        input: req.query.userInput,
        result: response.data
      })
    })
    .catch(console.error)
})

app.get('/details', (req, res)=>{
  console.log(req.query)
  const url = `http://www.omdbapi.com/?i=${req.query.userInput}&apikey=${apikey}`
  axios.get(url)
    .then(response=>{
      console.log(response.data)
      res.render('detail.ejs', {
        input: req.query.userInput,
        result: response.data
      })
    })
    .catch(console.error)
})

app.listen(PORT, () =>{
    console.log('Yo from ', PORT)
})