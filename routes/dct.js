var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  res.render('dct', { title: 'DCT Rechner', dct: "" });
});

router.post('/', function(req, res, next) {
  var matrix = req.body.matrix;

  var dct = compute(matrix);

  res.render('dct', { title: 'DCT Rechner', dct: dct });
});

function compute(matrix) {
  let input = matrix; 

  let outputMatrix = new Array(8).fill(0).map(() => new Array(8).fill(0));

  const numbers = input.split(/\D+/).map(Number);

  const inputMatrix = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const nextNumber = numbers.shift();
      row.push(nextNumber);
    }
    inputMatrix.push(row);
  }

  for (let u = 0; u < 8; u++) {
    for (let v = 0; v < 8; v++) {
      let sum = 0;
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          sum += inputMatrix[x][y] * Math.cos(((2 * x + 1) * u * Math.PI) / 16) * Math.cos(((2 * y + 1) * v * Math.PI) / 16);
        }
      }
      sum *= 0.25;
      if (u === 0) sum *= 1 / Math.sqrt(2);
      if (v === 0) sum *= 1 / Math.sqrt(2);
      outputMatrix[u][v] = Math.round(sum);
    }
  }

  return outputMatrix;
}

module.exports = router;
