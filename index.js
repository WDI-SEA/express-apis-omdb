var express = require("express");
var app = express();
var request = require("request");
//var ejsLayouts = require("express-ejs-layouts");


app.use(express.static(__dirname + '/'));
app.set("view engine", "ejs");


//app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index.ejs');
});

// receive user GET request at /results
app.get("/results", function(req, res){
  // capture user query string
  var search = req.query.q;
  //console.log(search);
   // initiate request to OMDB server to return data
  request(
  "http://www.omdbapi.com/?s="+search, 
    function(error, response, body){
      if(!error && response.statusCode == 200) {
       var results = JSON.parse(body);
       //console.log(results);
         //console.log(body);
         //res.render(body);
        res.render('results.ejs', {movies:results}); //parse JSON
      }
    }
  );
});

//get individual movie info
app.get("/movies/:id", function(req, res){
  console.log(req.params);
  var movieId = req.params.id;
  request(
  "http://www.omdbapi.com/?i="+movieId,
    function(error, response, body) {
      if(!error && response.statusCode == 200) {
        var details = JSON.parse(body);
        res.render('showmovie.ejs',{movies:details})
      }
    }
  )

});




app.listen(3000);