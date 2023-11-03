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
  res.render('cc', { title: 'CC', result: "", key: ""});
});

// Definition der HTTP POST-Route für Formulardaten
router.post('/', function(req, res, next) {
  // Extrahieren der Formulardaten aus der Anfrage
  var ciphertext = req.body.ciphertext;
  var schluessel = parseInt(req.body.key);

  console.log('Received schluessel:', schluessel); // Hinzugefügte Zeile
  console.log(isNaN(schluessel));

  var result = "";

  if (isNaN(schluessel)) {
    result = autoDecrypt(ciphertext);
  } else {
    result = manuDecrypt(ciphertext, schluessel);
  }

  // Rendern der 'bmi'-Ansicht mit den berechneten Werten und dem Titel
  res.render('cc', { title: 'CC', result: result, key: schluessel });
});

function autoDecrypt(ciphertext) {
  let encryptedText = ciphertext;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const possibleKeys = [];

  const germanWords = ['der', 'die', 'das', 'und', 'in', 'den', 'nicht', 'von', 'zu', 'mit']; // Beispielsweise

  for (let key = 0; key < 26; key++) {
    const decryptedText = encryptedText.split('').map(char => decryptChar(char, key)).join('');
    const wordMatches = decryptedText.split(' ').filter(word => germanWords.includes(word.toLowerCase())).length;

    possibleKeys.push({ key, score: wordMatches });
  }

  // Hilfsfunktion zum Verschlüsseln eines einzelnen Zeichens
  function decryptChar(char, key) {
    if (char.match(/[a-z]/i)) {
      const isLowerCase = char === char.toLowerCase();
      const charCode = char.toLowerCase().charCodeAt(0);
      const decryptedCharCode = ((charCode - 97 - key) % 26 + 26) % 26 + 97;
      return isLowerCase ? String.fromCharCode(decryptedCharCode) : String.fromCharCode(decryptedCharCode).toUpperCase();
    }
    return char;
  }

  possibleKeys.sort((a, b) => b.score - a.score);

  const mostLikelyKey = possibleKeys[0].key;
  const decryptedText = encryptedText.split('').map(char => decryptChar(char, mostLikelyKey)).join('');

  return "MostLikeyKey: " + mostLikelyKey + "DecryptedText: " + decryptedText;
}

function manuDecrypt(ciphertext, schluessel) {
  let encryptedText = ciphertext;
  let key = schluessel;

  if (typeof encryptedText !== 'string' || typeof key !== 'number') {
    console.log("Ungültige Eingabe");
  }

  // Hilfsfunktion zum Verschlüsseln eines einzelnen Zeichens
  function decryptChar(char, key) {
    if (char.match(/[a-z]/i)) {
      const isLowerCase = char === char.toLowerCase();
      const charCode = char.toLowerCase().charCodeAt(0);
      const decryptedCharCode = ((charCode - 97 - key) % 26 + 26) % 26 + 97;
      return isLowerCase ? String.fromCharCode(decryptedCharCode) : String.fromCharCode(decryptedCharCode).toUpperCase();
    }
    return char;
  }

  // Entschlüsseln des gesamten Texts
  const decryptedText = encryptedText.split('').map(char => decryptChar(char, key)).join('');

  return decryptedText;
}

// Exportieren des Routers für die Verwendung in anderen Teilen der Anwendung
module.exports = router;
