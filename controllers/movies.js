var express = require("express");
var router = express.Router();
var request = require("request");
var ejsLayouts = require("express-ejs-layouts")

router.use(ejsLayouts);

router.get('/', function(req, res) {
  res.render('movies');
});

router.get('/id/:imdbID', function(req, res) {
  var movieID = req.params.imdbID;

  request('http://www.omdbapi.com/?i=' + movieID, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode === 200) {
      var properties = [];
      for (var key in data) {
        properties.push({
          key: key,
          value: data[key]
        })
      }

      res.render("singleMovie", {movie: data, properties: properties});

      //res.render('singleMovie';
    } else {
      res.render('error');
    }

  })
})

router.get('/show', function(req, res) {
  var query = req.query.q;
  request('http://www.omdbapi.com/?s=' + query, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode  === 200 && data.Search) {
      //res.send(data.Search);
      // console.log(data.Search[0]);
      res.render('show', {movies: data.Search,
                            q: query});
    } else {
      res.render('error');
    }

  })
})




module.exports = router;