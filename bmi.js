document.getElementById('bmiCalculator').addEventListener('submit', function(event) {
    event.preventDefault(); // Zapobiegamy domyślnemu zachowaniu formularza
    
    // Pobieramy wartości wprowadzone przez użytkownika
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('unit').value;
    
    // Konwertujemy jednostki na metryczne, jeśli wybrano imperialne
    if (unit === 'imperial') {
      const weightInKg = weight * 0.453592; // Konwersja funtów na kilogramy
      const heightInCm = height * 2.54; // Konwersja cali na centymetry
      // Aktualizujemy wartości wag i wzrostu
      weight = weightInKg;
      height = heightInCm;
    }
    
    // Obliczamy BMI
    const bmi = weight / ((height / 100) * (height / 100));
    
    // Wyświetlamy wynik BMI
    const resultDiv = document.getElementById('bmiResult');
    resultDiv.innerHTML = '<h2>Your BMI</h2><p>Your BMI is: ' + bmi.toFixed(2) + '</p>';
    
    // Dodajemy krótką informację o BMI
    if (bmi < 18.5) {
      resultDiv.innerHTML += '<p>You are underweight.</p>';
    } else if (bmi >= 18.5 && bmi < 25) {
      resultDiv.innerHTML += '<p>You are within a healthy weight range.</p>';
    } else if (bmi >= 25 && bmi < 30) {
      resultDiv.innerHTML += '<p>You are overweight.</p>';
    } else {
      resultDiv.innerHTML += '<p>You are obese.</p>';
    }
  });