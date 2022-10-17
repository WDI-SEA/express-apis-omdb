const { render } = require('ejs')
const express = require('express')
const axios = require('axios');

const router = express.Router()


const fs = require('fs')


// main route
router.get('/', (req, res) => {
  console.log(process.env.RANDOM_ENV_VAR)
  // res.send('Hello, backend!');
  res.render('index.ejs');
});



// When user searches for a movie
router.get('/results', (req, res) => {


    let context = {}

    // Make a request for the api

    let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`

    // let s = req.query.s
    let s = req.query.s
    let y = req.query.y
    let plot = req.query.plot
    

    console.log(`The plot is: ${plot}`)

    // concat the query
    if(s !== ''){
        url = url + `&s=${s}`
    }

    // if(y !== ''){
    //     url = url + `&y=${y}`
    // }

    // if(plot === 'full'){
    //     url = url + `&plot=${plot}`
    // }



    console.log(url)

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
    })
    .finally(() => {
    // always executed
    });



  });


//   GET /movies/:movie_id

router.get('/movies/:movie_id', (req, res) => {

    let context = {}

    // Make a request for the api

    let url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`

    // imdb key
    let i = req.params.movie_id


    if(i){
        url = url + `&i=${i}`
    }



    console.log(url)

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
    console.log(error);
    })
    .finally(() => {
    // always executed
    });

    
})



module.exports = router