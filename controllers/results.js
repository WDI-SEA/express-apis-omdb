var express = require("express");
var request = require("request");
var router = express.Router();

router.use(express.static("public"));
/////////////////////////////////////////

router.get("/", function (req, res) {
  request({
    url: "http://www.omdbapi.com",
    qs: {
      s: req.query.title
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      res.render("results.ejs", {results: dataObj.Search});
    }
  });
});

////////////////////////////////////////
module.exports = router;
