require('dotenv').config();
const express= require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');


//get results
router.get('/results', (req, res)=>{
    console.log('RESULTS');
    // res.send("RESULTS MOFO")
    axios.get(`http://omdbapi.com/?s=${req.query.movie_title}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
        // console.log("RESPONSE");
        // res.send(response.data);
        res.render('results', {movies: response.data.Search});
    });
})

  //get details
router.get('/details/:id', (req, res) =>{
    // console.log("DETAILS");
    let param = req.params.id;
    // console.log(param);
    axios.get(`http://omdbapi.com/?i=${param}&apikey=${process.env.OMDB_API_KEY}`)
    .then(response => {
        // console.log(response.data);
        // console.log(response.data.Poster);
        res.render('details', {details: response.data});
    });
})

//CREATE - post /moviesß
router.post('/faves', (req, res) =>{
    // console.log(req.body);
    // res.send("CHECK YO CONSOLE");
    let newFave = req.body;
    let newFaveTitle = newFave.title;
    let newFaveImdbId = newFave.imdbid;
    // console.log(newFaveTitle);
    db.fave.findOrCreate({
        where: {
            title: newFaveTitle
        },
        defaults:{
            imdbid: newFaveImdbId
        }
    }).then(([fave, created]) =>{
        // console.log(`${fave.title} was ${created ? 'created' : 'found'}`)
        // res.send('FAVES');
        db.fave.findAll()
        .then(movies =>{
            // res.send(movies);
            res.render('faves', {movies: movies} )
            process.exit();
        })
    }).catch(err => console.log(err));
})

module.exports = router;