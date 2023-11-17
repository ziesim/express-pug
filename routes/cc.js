var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  res.render('cc', { title: 'Ceasars Cipher', result: "", key: ""});
});

router.post('/', function(req, res, next) {
  var ciphertext = req.body.ciphertext;
  var schluessel = parseInt(req.body.key);

  var result = "";

  if (isNaN(schluessel)) {
    result = autoDecrypt(ciphertext);

    const [keySubstring, decryptedTextSubstring] = result.split('DecryptedText: ');

    schluessel = parseInt(keySubstring.replace('Schlüssel: ', ''));
    result = decryptedTextSubstring.trim();
  } else {
    result = manuDecrypt(ciphertext, schluessel);
  }

  res.render('cc', { title: 'Ceasars Cipher', result: result, key: schluessel });
});

function autoDecrypt(ciphertext) {
  let encryptedText = ciphertext;
  const possibleKeys = [];

  const germanWords = ['der', 'die', 'das', 'und', 'in', 'den', 'nicht', 'von', 'zu', 'mit'];

  for (let key = 0; key < 26; key++) {
    const decryptedText = encryptedText.split('').map(char => decryptChar(char, key)).join('');
    const wordMatches = decryptedText.split(' ').filter(word => germanWords.includes(word.toLowerCase())).length;

    possibleKeys.push({ key, score: wordMatches });
  }

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

  return "Schlüssel: " + mostLikelyKey + " DecryptedText: " + decryptedText;
}

function manuDecrypt(ciphertext, schluessel) {
  let encryptedText = ciphertext;
  let key = schluessel;

  if (typeof encryptedText !== 'string' || typeof key !== 'number') {
    console.log("Ungültige Eingabe");
  }

  function decryptChar(char, key) {
    if (char.match(/[a-z]/i)) {
      const isLowerCase = char === char.toLowerCase();
      const charCode = char.toLowerCase().charCodeAt(0);
      const decryptedCharCode = ((charCode - 97 - key) % 26 + 26) % 26 + 97;
      return isLowerCase ? String.fromCharCode(decryptedCharCode) : String.fromCharCode(decryptedCharCode).toUpperCase();
    }
    return char;
  }

  const decryptedText = encryptedText.split('').map(char => decryptChar(char, key)).join('');

  return decryptedText;
}

module.exports = router;
