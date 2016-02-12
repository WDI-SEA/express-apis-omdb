var db = require('./models');

db.favorite.create({
	title: '',
	year: '',
}).then(function(favorite) {
	console.log(favorite.get());
});