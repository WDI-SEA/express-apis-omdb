var express = require("express");
var router = express.Router();
var request = require("request");
var ejsLayouts = require("express-ejs-layouts");
var db = require('../models');

router.use(ejsLayouts);

router.get('/', function(req, res) {
  db.favorite.findAll({}).then(function (favorites) {
    console.log(favorites);
    res.render('favorites', {favorites: favorites});
  });
})

router.post('/:imdbID', function(req, res) {
  var movieID = req.body.imdbID;
  console.log(req.body.imdbID);

  request('http://www.omdbapi.com/?i=' + movieID, function(err, response, body) {
    var data = JSON.parse(body);
    if (!err && response.statusCode  === 200) {
      var properties = [];
      for (var key in data) {
        properties.push({
          key: key,
          value: data[key]
        })
      }

      db.favorite.create({title: data.Title, year: data.Year, imdbID: data.imdbID}).then(function() {
        res.status(200).send('Created!!');
      });

      //res.render('singleMovie';
    } else {
      res.render('error');
    }

  })
})

router.get('/:imdbID/comments', function(req, res) {
  res.render('comments');
})

module.exports = router;