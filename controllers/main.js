const express = require('express'),
router = express.Router(),
axios = require('axios'),
db = require('../models')

router.get('/', (req,res) => {
    res.render('index.ejs')
})

// router.get('/movies', (req,res) => {
//     // res.send('<img style="display: block;margin-left: auto;margin-right: auto;width: 50%;" src="/images/uc.jpeg">');
// })

router.get('/results', (req, res) => {
    axios.get(`http://www.omdbapi.com/?s=${req.query.q}&apikey=${process.env.API_KEY}`)
        .then((results) => {            
                res.render('results', { results: results.data.Search })
        })
})

router.get('/faves', (req, res) => {

    async function allFavMovies() {
        try {
             await db.favorite.findAll()
            .then(data => {
                res.render('faves.ejs', {faves:data})
            })
            
        } catch (error) {
            console.log(error);
        }
    }
    allFavMovies(); 
})


router.post('/faves', (req, res) => {
    async function createFavMovie() {
        try {
            await db.favorite.create({
               title:req.body.title,
               imdbid:req.body.imdbid
            }).then(c=>{
                res.redirect('/faves')
            })
        } catch (err) {
            console.log(err)
        }
    }
    createFavMovie()
})


router.get('/movies/:id', (req, res) => {
    console.log(req.query)
    axios.get(`http://www.omdbapi.com/?i=${req.params.id}&apikey=${process.env.API_KEY}`)
        .then((movieDetails) => {
            res.render('detail', { movies: movieDetails.data })
        })

})


module.exports = router;