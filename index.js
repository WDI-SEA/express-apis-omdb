//requires
var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');
var favCtrl = require("./controllers/favorites");
var db = require("./models");

var app = express();
app.set('view engine', 'ejs');

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/favorites", favCtrl);

//routes
app.get("/", function(req, res) {
  res.render("index", {});
});

app.get("/movies", function(req, res) {
  var query = req.query.q;
  var pageNum = req.query.page;

  if(query === '' || query === undefined){
    res.render('index');
    return;
  }

  if(pageNum === '' || pageNum === undefined){
    pageNum = 1;
  }

  request('http://www.omdbapi.com/?s=' + query + '&page=' + pageNum, function(err, response, body) {
    var data = JSON.parse(body);
    if(!err && response.statusCode === 200 && data.Search) {
      res.render('movies', {movies: data.Search, q: query, page: pageNum, totalResults: data.totalResults});
      //res.send(data);
    }
    else{
      res.render('error');
    }
  });
});

app.get("/movies/:imdbID", function(req, res) {
  var imdbIDRequested = req.params.imdbID;

  request('http://www.omdbapi.com/?i=' + imdbIDRequested + '&tomatoes=true', function(err, response, body) {
    var data = JSON.parse(body);

    if(!err && response.statusCode === 200){
      db.favorite.count({where:{imdbID:imdbIDRequested}}).then(function(num){
        if(num > 0) {
          db.favorite.find({where:{imdbID:imdbIDRequested}}).then(function(movie){
            db.comment.findAll({where:{favoriteId:movie.id}}).then(function(comments){
              res.render('show', {showData: data, favorite:true, comments:comments});
            });
          });
        }
        else {
          res.render('show', {showData: data, favorite:false, comments:[]})
        }
      })
      //res.send(data.Title);
    }
    else{
      res.render('error');
    }



  });
});

app.listen(process.env.PORT || 3000);