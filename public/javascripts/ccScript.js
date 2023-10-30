function autoDecrypt() {
  let encryptedText = document.getElementById("ciphertext").value;
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

  let res = document.getElementById("res");
  res.innerHTML = "MostLikeyKey: " + mostLikelyKey + "DecryptedText: " + decryptedText;
}


function manuDecrypt() {
  let encryptedText = document.getElementById("ciphertext").value;
  let key = parseInt(document.getElementById("key").value);

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

  let res = document.getElementById("res");
  res.innerHTML = decryptedText
}