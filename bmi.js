document.addEventListener('DOMContentLoaded', function() {
    const metricBtn = document.getElementById('metricBtn');
    const imperialBtn = document.getElementById('imperialBtn');
    const metricForm = document.getElementById('metricForm');
    const imperialForm = document.getElementById('imperialForm');
  
    metricBtn.addEventListener('click', function() {
      metricForm.style.display = 'block';
      imperialForm.style.display = 'none';
    });
  
    imperialBtn.addEventListener('click', function() {
      metricForm.style.display = 'none';
      imperialForm.style.display = 'block';
    });
  
    document.getElementById('bmiCalculator').addEventListener('submit', function(event) {
      event.preventDefault(); 
  
      let weight, height;
  
      if (metricForm.style.display === 'block') {
        height = parseFloat(document.getElementById('height').value);
        weight = parseFloat(document.getElementById('weight').value);
      } else {
        const feet = parseFloat(document.getElementById('feet').value);
        const inches = parseFloat(document.getElementById('inches').value);
        const stone = parseFloat(document.getElementById('stone').value);
        const pounds = parseFloat(document.getElementById('pounds').value);
  
        height = (feet * 30.48) + (inches * 2.54);
        weight = (stone * 6.35029) + (pounds * 0.453592);
      }
  
      const bmi = weight / ((height / 100) * (height / 100));
  
      const resultDiv = document.getElementById('bmiResult');
      resultDiv.innerHTML = '<h2>Your BMI</h2><p>Your BMI is: ' + bmi.toFixed(2) + '</p>';
  
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
  });