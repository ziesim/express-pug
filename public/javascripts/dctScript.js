// Die compute-Funktion wird aufgerufen, wenn der Benutzer auf einen Button klickt oder ein ähnliches Ereignis ausgelöst wird.
function compute() {
  // Holen Sie sich den Eingabe-String aus einem HTML-Element mit der ID "matrix".
  let input = document.getElementById("matrix").value;

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

  // Geben Sie die Eingabe-Matrix in der Konsole aus.
  console.log(inputMatrix);

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

  // Geben Sie die DCT-Matrix in der Konsole aus.
  console.log(outputMatrix);

  // Holen Sie sich ein HTML-Element mit der ID "res", um das Ergebnis anzuzeigen.
  let res = document.getElementById("res");

  // Setzen Sie den HTML-Inhalt des Elements auf die berechnete DCT-Matrix (als Text).
  res.innerHTML = outputMatrix;
}
