document.addEventListener("DOMContentLoaded", function() {
    // Pobierz elementy formularza i powitalnego komunikatu
    const form = document.querySelector('.bmi_form');
    const weightInput = document.querySelector('.weight_input');
    const heightInput = document.querySelector('.height_input');
    const welcomeMessage = document.querySelector('.welcome_message');
    const unitSelection = document.querySelector('.unit_selection');
  
    // Nasłuchuj zmian w formularzu
    form.addEventListener('input', function() {
      // Pobierz wartości z pól formularza
      const weight = parseFloat(weightInput.value);
      const height = parseFloat(heightInput.value);
      const units = document.querySelector('input[name="units"]:checked').value;
  
      if (!isNaN(weight) && !isNaN(height)) {
        // Jeśli oba pola są wypełnione, oblicz BMI
        const bmi = calculateBMI(weight, height, units);
        // Wyświetl wynik BMI
        welcomeMessage.innerHTML = `
          <h3>Your BMI</h3>
          <p>Your BMI is: ${bmi.toFixed(2)}</p>
        `;
      } else {
        // Jeśli niektóre pola nie są wypełnione, wyświetl standardowy komunikat powitalny
        welcomeMessage.innerHTML = `
          <h3>Welcome!</h3>
          <p>Enter your height and weight and you will see your BMI result here.</p>
        `;
      }
    });
  
    // Dodaj nasłuchiwanie zmian w opcjach wyboru jednostek
    unitSelection.addEventListener('change', function() {
      // Aktualizuj komunikat powitalny po zmianie jednostek
      welcomeMessage.innerHTML = `
        <h3>Welcome!</h3>
        <p>Enter your height and weight and you will see your BMI result here.</p>
      `;
    });
  
    // Funkcja do obliczania BMI
    function calculateBMI(weight, height, units) {
      if (units === 'metric') {
        // Oblicz BMI dla jednostek metrycznych
        return weight / Math.pow(height, 2);
      } else {
        // Przekonwertuj wzrost na metry, jeśli jednostki imperialne
        const heightInMeters = height * 0.0254;
        // Oblicz BMI dla jednostek imperialnych
        return (weight / Math.pow(heightInMeters, 2)) * 703;
      }
    }
  });