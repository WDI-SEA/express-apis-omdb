// Importing the required libraries
const { render } = require('ejs')
const express = require('express')
const axios = require('axios');
const db = require('../models')
const fs = require('fs')

const router = express.Router()


// main route
router.get('/', (req, res) => {
  res.render('index.ejs');
});



// When user searches for a movie
router.get('/results', (req, res) => {

  let context = {}
  let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`

  // let s = req.query.s
  let s = req.query.s
  let y = req.query.y
  let plot = req.query.plot


  console.log(`The plot is: ${plot}`)

  // concat the query
  if (s !== '') {
    url = url + `&s=${s}`
  }

  // if(y !== ''){
  //     url = url + `&y=${y}`
  // }

  // if(plot === 'full'){
  //     url = url + `&plot=${plot}`
  // }



  console.log(url)

  // Make a request for the api
  axios.get(url)
    .then((response) => {
      // handle success
      console.log(response.data.Search);


      // Process the data
      context.moviesList = response.data.Search

      // Render the page incase of success
      res.render('results.ejs', context);
    })
    .catch((error) => {
      // handle error
      console.log(error);
      res.send('Error!!')
    })
    .finally(() => {
      // always executed
    });



});


//   GET /movies/:movie_id

router.get('/movies/:movie_id', (req, res) => {

  let context = {}


  let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`

  // imdb key
  let i = req.params.movie_id


  if (i) {
    url = url + `&i=${i}`
  }

  console.log(url)

  // Make a request for the api
  axios.get(url)
    .then((response) => {
      // handle success
      console.log(response.data);


      // Process the data
      // send to views
      context.movie = response.data


      // Render the page incase of success
      res.render('detail.ejs', context);
    })
    .catch((error) => {
      // handle error
      res.send('Error!!')
    })
    .finally(() => {
      // always executed
    });


})

// When user does the add to favorite form
router.post('/faves', (req, res) => {

  const newTitle = req.body.title
  const newImdbid = req.body.imdbid

  // Add the data to db
  db.fave.create({
    title: newTitle,
    imdbid: newImdbid
  })
  .then(() => {

    console.log("New Favorite Added")

    res.redirect('/faves')
  })
  .catch(err => {
    console.log(err)
    res.send('Error!!')
  })


})


// Load up the faves page
router.get('/faves', (req, res) => {

  let context = {}

  // database function
  db.fave.findAll()
    .then(allFaves => {

      console.log(allFaves)

      context.allFaves = allFaves

      res.render('faves.ejs', context)
    })
    .catch(err => {
      console.log(err)

      res.send('Error!!')
    })

})



module.exports = router