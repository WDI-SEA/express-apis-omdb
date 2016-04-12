var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var request= require("request");
var app = express();

app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("index", {title: "Favorite Foods", foods: ["sandwich", "corn dog"]})
});

// app.get("/animals", function(req, res) {
//   res.render("animals", {title: "Favorite Animals", animals: ["sand crab", "corny joke dog"]})
// });

// app.get("/movies", function (req, res) {
// 	var query = req.query.q;

app.get("/movies", function (req, res) {
  var qs = {
    s: 'star wars'
  };

  request({
    url: 'http://www.omdbapi.com',
    qs: qs
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataObj = JSON.parse(body);
      var results = dataObj.Search;
      

      res.render("movies", {results: results});
    }
  });
});


app.listen(3000);