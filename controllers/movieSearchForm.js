var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('movieSearchForm/index.ejs');
});


router.get('/random', function(req, res) {
	res.send(process.env.MY_SECRET_KEY);
});


module.exports = router;