var express = require("express");
var router = express.Router();

router.get("/", function(req ,res){
	res.send(process.env.My_secret_key);
});

router.get("/morestuff", function(req,res){
	res.send("We have more stuff");
});


module.exports = router;
