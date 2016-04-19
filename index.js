var express = require("express");
var bodyParser = require("body-parser")
var ejsLayouts = require("express-ejs-layouts")
var peopleCtrl = require("./controllers/people")
var movieCtrl = require("./controllers/movies")
var favCtrl = require("./controllers/favorites")
var request = require("request");

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/movies", movieCtrl);
app.use("/people", peopleCtrl);
app.use("/favorites", favCtrl);
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get("/", function(req, res) {
  console.log('Hit home route');
  res.render("movies")
});

app.listen(3000);