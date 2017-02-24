//require statements and global vars
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var app = express();
var lastQueryResults = {};


//set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(express.static(__dirname + "/public"));

//include external routes
app.use("/movies", require("./controllers/movies"));

//routes
app.get('/', function(req, res) {
  res.render("index");
});

app.get('/results', function(req, res) {
  res.render("results", {results: lastQueryResults});
});

app.post("/", function(req, res){
  console.log(req.body.title);
  var qs = {
    s: req.body.title
  };

  request({
    url: 'http://www.omdbapi.com/',
    qs: qs
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      var dataObj = JSON.parse(body);
      lastQueryResults = dataObj.Search;
      res.render("results", {results: dataObj.Search});
    }
  });
});

//listen or export
var server = app.listen(process.env.PORT || 3000);
module.exports = server;
