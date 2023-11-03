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
  res.render('dct', { title: 'DCT Rechner', dct: "" });
});

// Definition der HTTP POST-Route für Formulardaten
router.post('/', function(req, res, next) {
  // Extrahieren der Formulardaten aus der Anfrage
  var matrix = req.body.matrix;

  var dct = compute(matrix);

  // Rendern der 'bmi'-Ansicht mit den berechneten Werten und dem Titel
  res.render('dct', { title: 'DCT Rechner', dct: dct });
});

// Die compute-Funktion wird aufgerufen, wenn der Benutzer auf einen Button klickt oder ein ähnliches Ereignis ausgelöst wird.
function compute(matrix) {
  // Holen Sie sich den Eingabe-String aus einem HTML-Element mit der ID "matrix".
  let input = matrix; 

  // Erstellen Sie eine leere 8x8 Ausgabe-Matrix und initialisieren Sie sie mit Nullen.
  let outputMatrix = new Array(8).fill(0).map(() => new Array(8).fill(0));

  // Zerlegen Sie den Eingabe-String in Zahlen, indem Sie auf Leerzeichen oder Nicht-Zahlen aufteilen und in ein Array von Zahlen konvertieren.
  const numbers = input.split(/\D+/).map(Number);

  // Erstellen Sie eine 8x8 Eingabe-Matrix und befüllen Sie sie mit den Zahlen aus dem Array.
  const inputMatrix = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      // Nehmen Sie die nächste Zahl aus dem Array und fügen Sie sie in die Zeile ein.
      const nextNumber = numbers.shift();
      row.push(nextNumber);
    }
    // Fügen Sie die Zeile zur Eingabe-Matrix hinzu.
    inputMatrix.push(row);
  }

  // Berechnen Sie die DCT (Diskrete Cosinus-Transformation) für die Eingabe-Matrix.
  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          // DCT-II-Formel: Summieren Sie die Produkte der Eingabe-Matrix und der Cosinus-Terme.
          sum += inputMatrix[x][y] * Math.cos(((2 * x + 1) * u * Math.PI) / 16) * Math.cos(((2 * y + 1) * v * Math.PI) / 16);
        }
      }
      // Skalieren Sie das Ergebnis entsprechend der DCT-Formel.
      sum *= 0.25;
      if (u === 0) sum *= 1 / Math.sqrt(2);
      if (v === 0) sum *= 1 / Math.sqrt(2);
      // Runden Sie das Ergebnis und speichern Sie es in der Ausgabe-Matrix.
      outputMatrix[u][v] = Math.round(sum);
    }
  }

  // Setzen Sie den HTML-Inhalt des Elements auf die berechnete DCT-Matrix (als Text).
  return outputMatrix;
}

// Exportieren des Routers für die Verwendung in anderen Teilen der Anwendung
module.exports = router;
