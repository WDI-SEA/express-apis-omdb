var express = require('express');
var app = express();

// this adds some logging to each request
app.use(require('morgan')('dev'));

$('#btnSearch').on('click', function () {
	var searchInput = $('#textBoxElement').val();	
	app.get('/results', function(req, res) {
		var url = "http://monkey=" + searchInput + "&red";
		request(url, function(err, response, body){
		if(!err && response.statusCode === 200){
			var parsedJson = JSON.parse(body);
			res.render('home', {movies: parsedJson.Search});
		}
		else {
			console.log(err);
			res.send('error');
		}
		res.send('Hello Backend!');
	});
    // var url = "http://monkey=" + searchInput + "&red";
    // window.open(url);
});





var server = app.listen(process.env.PORT || 3000);

module.exports = server;
