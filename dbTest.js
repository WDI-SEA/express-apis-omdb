var db = require("./models");

// db.comment.create({
// 	body: 'stuff'	
// }).then(function(comment) {
// 	console.log(comment.get());
// });

// db.favorite.findById(9).then(function(fav) {
// 	console.log(fav.get());
// 	// db.comment.create({
// 	// 	body: "alkdlakjdflajd",
// 	// 	author: "Katlyn",
// 	// 	favoriteId: fav.id
// 	// }).then(function() {

// 	// });
// });

// db.favorite.fine({
// 	where: {
// 		id: 9
// 	},
// 	include: [db.comment]
// }).then(function(fav) {
// 	console.log(fav.get());
// });

// db.favorite.findById(9).then(function(fav) {
// 	fav.getComments().then(function(comments) {
// 		console.log(comments);
// 	});
// });