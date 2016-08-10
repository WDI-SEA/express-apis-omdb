//Requirements

var express = require('express');
var request = require('request');
var router = express.Router();

//Routes- 
router.get('/', function(req, res) {
    console.log(req.body);
    var qs = {
        s: req.query.q, 
    }
    request({
        url: 'http://www.omdbapi.com',
        qs: qs
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            res.render('results.ejs', { movies: movieData.Search });
        } else {
            res.send('Sorry, this movie is not in our database.');
        }

    });
});

router.get('/movies/:imdbID', function(req, res) {
    var imdbID = req.params.imdbID;

    request({
        url: 'http://www.omdbapi.com',
        qs: {
            i: imdbID,
            tomatoes: true
        }
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            res.render('movie.ejs', { movie: movieData });
        } else {
            res.send('Sorry, this movie is not in our database.');
        }

    });
});


module.exports = router;
