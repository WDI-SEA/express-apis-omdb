var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var ejsLayouts = require("express-ejs-layouts");

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get("/", function(req, res) {
  res.render("index")
});

app.listen(3000);
