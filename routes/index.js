//import nmp modules necessary
const EXPRESS = require('express');
const AXIOS = require('axios');
require('dotenv').config();
const FS = require('fs');
const { Router } = require('express');
const DB = require('../models');

//initialize our express server
const ROUTER = EXPRESS.Router();

//stud out a home route that returns hellos world
ROUTER.get('/', (req, res) => {
    res.render('index.ejs')
})

ROUTER.post('/results', (req, res) => {
    // console.log(process.env.OMDB_API_KEY)
    // console.log(req.body)
        AXIOS.get(`http://www.omdbapi.com/?s=${req.body.Title}&apikey=${process.env.OMDB_API_KEY}`)
            .then(response => {
                // console.log(response.data)
                res.render('results.ejs', {movies: response.data.Search})
            });
})

//POST route for /faves
ROUTER.post('/faves', (req,res) => {
//create a new favorite w info from req.body
    DB.fave.create({
        title: req.body.Title,
        imdbid: req.body.imdbID
    }).then((fave) => {
        console.log("my new fave", fave.title);
        console.log(fave.imdbid)
        res.redirect('/')
        //redirect to the index for all users
    })
});

//GET all of my faves
ROUTER.get('/faves', (req, res) => {
    console.log('------FAVORITES--------');
    DB.fave.findAll()
    .then((faves) => {
        res.render('faves.ejs', {faves});
    })
});





ROUTER.get('/movie/:movie_id', (req, res) => {
    console.log('hello');
    let movieID = req.params.movie_id;
    console.log('this is the movie id', movieID);
    AXIOS.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
        console.log(response)
        res.render('detail.ejs', {movie: response.data})
    });
    console.log('hey there');
})

module.exports = ROUTER;