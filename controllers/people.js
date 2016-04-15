var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.send("Feynman, Ken Kesey, Spock")
});

module.exports = router;