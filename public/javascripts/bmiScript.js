// Diese Funktion wird aufgerufen, wenn der Benutzer den BMI berechnen-Button anklickt.
function calculateBMI() {
    // Holen Sie sich das Gewicht des Benutzers aus dem HTML-Element mit der ID "gewicht".
    let gewicht = document.getElementById("gewicht").value;

    // Holen Sie sich die Körpergröße des Benutzers aus dem HTML-Element mit der ID "koerpergroesse".
    let koerpergroesse = document.getElementById("koerpergroesse").value;

    // Berechnen Sie den BMI (Body Mass Index) des Benutzers, indem Sie das Gewicht durch das Quadrat der Körpergröße teilen.
    // Verwenden Sie ".toFixed(2)" zur Rundung auf zwei Dezimalstellen.
    let bmi = (gewicht / (koerpergroesse * koerpergroesse)).toFixed(2);

    // Holen Sie sich das HTML-Element mit der ID "bmi", um das Ergebnis anzuzeigen.
    let bmiElement = document.getElementById("bmi");

    // Setzen Sie den HTML-Inhalt des Elements, um den berechneten BMI anzuzeigen.
    bmiElement.innerHTML = "Dein BMI beträgt: " + bmi;
}
