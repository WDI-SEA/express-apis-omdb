var express = require("express");
var ejsLayouts = require("express-ejs-layouts")
var peopleCtrl = require("./controllers/people")
var movieCtrl = require("./controllers/movies")
var request = require("request");

var app = express();

app.use(express.static(__dirname + '/'));
app.use("/movies", movieCtrl);
app.use("/people", peopleCtrl);
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get("/", function(req, res) {
  res.render("movies")
});





app.listen(3000);