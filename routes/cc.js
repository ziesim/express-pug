var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cc', { title: "Ceasar's Cipher:" });
});

module.exports = router;
