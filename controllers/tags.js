var express = require('express');
var app = express();
var router = express.Router();
var db = require('../models');

app.set('view engine', 'ejs');

router.get('/', function(req, res) {
	db.tag.findAll().then(function(allTags) {
		res.render('tags/index.ejs', {tags: allTags});
	})
	
});

/*router.get('/:id', function(req, res) {
	var tagNum = req.params.id;
	
})*/

module.exports = router;