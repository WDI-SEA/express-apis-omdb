var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('movieSearchForm/index.ejs');
});

module.exports = router;