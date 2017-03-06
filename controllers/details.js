var express = require("express");
var request = require("request");
var router = express.Router();

router.use(express.static("public"));
/////////////////////////////////////////

router.get("/:id", function (req, res) {
  request({
    url: "http://www.omdbapi.com",
    qs: {
      i: req.params.id
      // plot: "long"
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var detailsObj = JSON.parse(body);
      console.log(detailsObj);
      res.render("details.ejs", {details: detailsObj});
    }
  });
});

////////////////////////////////////////
module.exports = router;
