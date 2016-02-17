var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
	res.send("I am random");
});

router.get("/morestuff", function(req, res){
	res.send("We have more stuff");
});

module.exports = router;