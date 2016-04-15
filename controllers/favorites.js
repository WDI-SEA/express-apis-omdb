var express = require("express");
var router = express.Router();
var request = require("request");
var ejsLayouts = require("express-ejs-layouts")

router.use(ejsLayouts);


router.get('/favorites', function(req, res) {
  res.render('favorites');
})






module.exports = router;