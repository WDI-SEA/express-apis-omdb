var express = require("express");
var router = express.Router();

router.get("/movies/:imdbID", function(req, res) {
  res.send("");
});

module.exports = router;