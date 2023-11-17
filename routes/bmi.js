var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  res.render('bmi', { title: 'BMI Rechner', bmi: "", gewicht: "", koerpergroesse: "" });
});

router.post('/', function(req, res, next) {
  var gewicht = parseFloat(req.body.gewicht);
  var koerpergroesse = parseFloat(req.body.koerpergroesse);

  var bmi = (gewicht / (koerpergroesse * koerpergroesse)).toFixed(2);

  res.render('bmi', { title: 'BMI Rechner', bmi: bmi, gewicht: gewicht, koerpergroesse: koerpergroesse });
});

module.exports = router;
