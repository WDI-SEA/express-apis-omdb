

// import express and axios
const express = require('express')

const axios = require('axios')
const rowdy = require('rowdy-logger')
// declare the instance of the app
const app = express()
const layouts = require('express-ejs-layouts')
const rowdyResults = rowdy.begin(express())
const fs = require('fs')


//import and config dotenv library
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts)

//define port
const PORT = 3000

// define api key var
const omdbApiKey = process.env.OMDB_API_KEY




//define routes
app.get('/', (req,res) => {
  res.render('index')
})
  
  
 
app.get('/results', (req, res) => {
  let qs = {
    params: {s:req.query.q, apikey: omdbApiKey
    }
  }
  axios.get('http://www.omdbapi.com', qs)
  .then((response) => {
      let results = response.data.Search
      // console.log("look here", results)
      res.render('results', {movies:results})
  
      
      
      rowdyResults.print()

      // res.send(response.data.Production)
  })  
      .catch(err => {console.log(err)})
})







app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  // let qs = {

  //   //might have to change the params to include: http://www.omdbapi.com/?i=tt0239395 <- the ID!
  //   params: {s:req.query.q, apikey: omdbApiKey}
  // }

  axios.get('http://www.omdbapi.com/?apikey=' + omdbApiKey + "&i=" + id)
  .then((response) => {
      let results = response.data 
      console.log(results)
      
      res.render('detail', {movie:results})
  
      // /?apikey=' + omdbApiKey + "&i=" + id
      
      
     
  })  
    .catch(err => {console.log(err)})
  })


// added this to fix the error

app.get('/detail/:id', (req, res) => {
  const id = req.params.id
  let qs = {
    params: {s:req.query.q, apikey: omdbApiKey}
  }
  axios.get('http://www.omdbapi.com', qs)
  .then((response) => {
      let results = response.data.Search
      
      



      res.render('detail', {id:id})
  })    
  .catch(err => {console.log(err)})
})
  rowdyResults.print()




// open a port

app.listen(PORT, () => {
    console.log("Welcome to PORT 3000")
})