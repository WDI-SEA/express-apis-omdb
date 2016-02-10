var express = require("express");
var app = express();
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var searchValue;

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static(__dirname + '/'));

app.get("/", function(req, res){
	res.render("index.ejs");
	
});


app.get("/show", function(req, res){
	var searchResult = req.query.search;
	request(
		"http://omdbapi.com/?s="+searchResult, 
		function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log(body);
				res.render("show.ejs", {
					movieResult: JSON.parse(body)
				});
			} 
		}
	);
})
	
	

app.listen(3000);