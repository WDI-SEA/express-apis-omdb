var express = require("express");
var db = require('./models');
var app = express();
var request = require("request");
var favCtrl = require("./controllers/favorites");
app.use("/favorites", favCtrl);
//var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");


//app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index.ejs');
  //console.log("foooooooo");
});

// receive user GET request at /results
app.get("/results", function(req, res){
  // capture user query string
  var query = req.query.q;
  //console.log(search);
   // initiate request to OMDB server to return data
  request(
  "http://www.omdbapi.com/?s="+query, 
    function(error, response, body){
      var results = JSON.parse(body);
      if(!error && response.statusCode == 200 && results.Search) {
       
        res.render('results.ejs', {movies:results.Search,
                                  q: query}); //parse JSON
      } else {
        res.render('error');
      }
    });
});

//get individual movie info
app.get("/movies/:id", function(req, res){
  var searchQuery = req.query.q ? req.query.q : '';
  var movieId = req.params.id;
  request(
  "http://www.omdbapi.com/?i="+movieId,
    function(error, response, body) {
      
        var details = JSON.parse(body);
        res.render('showmovie.ejs',{movies:details,
                                    q: searchQuery});
      
    });

});




app.listen(3000);