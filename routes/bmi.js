// Express.js-Framework
var express = require('express');
// Erstellung eines Express-Routers
var router = express.Router();
// Middleware zur Verarbeitung von Formulardaten
var bodyParser = require('body-parser');

// Einrichten der 'body-parser'-Middleware
router.use(bodyParser.urlencoded({ extended: false }));

// Definition der HTTP GET-Route für die Startseite
router.get('/', function(req, res, next) {
  // Rendern der 'bmi'-Ansicht (Template) und Bereitstellen von Anfangsdaten
  res.render('bmi', { title: 'BMI Rechner', bmi: "", gewicht: "", koerpergroesse: "" });
});

// Definition der HTTP POST-Route für Formulardaten
router.post('/', function(req, res, next) {
  // Extrahieren der Formulardaten aus der Anfrage
  var gewicht = parseFloat(req.body.gewicht);
  var koerpergroesse = parseFloat(req.body.koerpergroesse);

  // BMI-Berechnung und Rundung auf zwei Dezimalstellen
  var bmi = (gewicht / (koerpergroesse * koerpergroesse)).toFixed(2);

  // Rendern der 'bmi'-Ansicht mit den berechneten Werten und dem Titel
  res.render('bmi', { title: 'BMI Rechner', bmi: bmi, gewicht: gewicht, koerpergroesse: koerpergroesse });
});

// Exportieren des Routers für die Verwendung in anderen Teilen der Anwendung
module.exports = router;
