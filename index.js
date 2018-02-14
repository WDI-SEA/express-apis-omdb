require("dotenv").config();
var express = require("express");
var request = require("request");
var fs = require("fs");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, "static")));

app.use(express.static('static'));

app.get("/", function(req, res) {
    res.render("search");
});

app.post("/results", function(req, res){
    console.log("In the /results route");
    var title = req.body.title;
    var qs = {
        s: title
    }
    request({
        url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&", 
        qs: qs
    }, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var dataObj = JSON.parse(body);
            console.log(dataObj.Search);
            res.render("results", { movies: dataObj.Search });
        }  
    });
});

app.get("/movie/:id", function(req, res){
    console.log("In the /results/:id route...");
    request({
        url: "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&i=" + req.params.id, 
    }, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var dataObj = JSON.parse(body);
            console.log(dataObj);
            res.render("movie", { movie: dataObj }); // change index to whatever your ejs file is called
        }  
    });
});

app.post("/favorite", function(req, res){
    console.log("In the /favorite route...");
    var fileContents = fs.readFileSync("./favorites.json");
    fileContents = JSON.parse(fileContents);
    fileContents.push(req.body.title);
    fileContents = JSON.stringify(fileContents);
    fs.writeFileSync('./favorites.json', fileContents);
    res.send({message: "success"});
});


var server = app.listen(3000);

// module.exports = server;
