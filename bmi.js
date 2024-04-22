document.addEventListener("DOMContentLoaded", function() {
    // Get form elements and welcome message
    const form = document.querySelector('.bmi_form');
    const weightInputs = document.querySelectorAll('.weight_input');
    const heightInputs = document.querySelectorAll('.height_input');
    const welcomeMessage = document.querySelector('.welcome_message');
    const unitSelection = document.querySelector('.unit_selection');

    // Function to toggle input fields based on unit
    function toggleInputFields(unit) {
        const metricInputs = document.querySelectorAll('.metric');
        const imperialInputs = document.querySelectorAll('.imperial');

        if (unit === 'metric') {
            metricInputs.forEach(input => {
                input.style.display = 'inline-block';
            });
            imperialInputs.forEach(input => {
                input.style.display = 'none';
            });
        } else {
            metricInputs.forEach(input => {
                input.style.display = 'none';
            });
            imperialInputs.forEach(input => {
                input.style.display = 'inline-block';
            });
        }
    }

    // Function to calculate BMI
    function calculateBMI(weight, height, units) {
        if (units === 'metric') {
            return weight / Math.pow(height / 100, 2);
        } else {
            const weightInKg = weight * 0.0283495;
            const feet = heightInputs[1].value;
            const inches = heightInputs[2].value;
            const heightInMeters = ((feet * 12) + inches) * 0.0254;
            return weightInKg / Math.pow(heightInMeters, 2);
        }
    }

    // Function to determine weight range for given height
    function weightRange(height, units) {
        let weightRangeMetric, weightRangeImperial;

        if (units === 'metric') {
            if (height < 150) {
                weightRangeMetric = "40-55";
            } else if (height >= 150 && height < 160) {
                weightRangeMetric = "56-64";
            } else if (height >= 160 && height < 165) {
                weightRangeMetric = "54-68";
            } else if (height >= 165 && height < 170) {
                weightRangeMetric = "57-72";
            } else if (height >= 170 && height < 175) {
                weightRangeMetric = "61-76";
            } else if (height >= 175 && height < 180) {
                weightRangeMetric = "63-81";
            } else if (height >= 180 && height < 185) {
                weightRangeMetric = "67-85";
            } else if (height >= 185 && height < 220) {
                weightRangeMetric = "78-100";
            } 
            return weightRangeMetric;
        } else {
            // Add weight range calculation for imperial units
        }
    }

    // Determine BMI category
    function bmiCategory(bmi) {
        if (bmi < 16.0) {
            return "underweight";
        } else if (bmi >= 16.0 && bmi < 16.9) {
            return "severely underweight";
        } else if (bmi >= 16.9 && bmi < 18.5) {
            return "underweight";
        } else if (bmi >= 18.5 && bmi < 25.0) {
            return "normal weight";
        } else if (bmi >= 25.0 && bmi < 30.0) {
            return "overweight";
        } else if (bmi >= 30.0 && bmi < 35.0) {
            return "obese class I";
        } else if (bmi >= 35.0 && bmi < 40.0) {
            return "obese class II";
        } else {
            return "obese class III";
        }
    }

    // Listen for changes in the form
    form.addEventListener('input', function() {
        // Get values from form fields
        const weight = parseFloat(weightInputs[0].value);
        const height = parseFloat(heightInputs[0].value);
        const units = document.querySelector('input[name="units"]:checked').value;

        if (!isNaN(weight) && !isNaN(height)) {
            // Calculate BMI
            const bmi = calculateBMI(weight, height, units);

            // Determine weight range for given height
            const weightRangeInfo = weightRange(height, units);

            // Determine BMI category
            const bmiCategoryInfo = bmiCategory(bmi);

            // Display BMI result
            welcomeMessage.innerHTML = `
                <h3 class="welcome_message_title">Your BMI is ${bmi.toFixed(2)}</h3>
                <p class="welcome_message_text">Your BMI falls within the ${bmiCategoryInfo} category. For your height, a weight range of ${weightRangeInfo} ${units === 'metric' ? 'kg' : 'lb'} would result in a healthy BMI.</p>
            `;
        } else {
            // If some fields are not filled, display standard welcome message
            welcomeMessage.innerHTML = `
                <h3 class="welcome_message_title">Welcome!</h3>
                <p class="welcome_message_text">Enter your height and weight and you will see your BMI result here.</p>
            `;
        }
    });

    // Listen for changes in unit selection
    unitSelection.addEventListener('change', function() {
        const units = document.querySelector('input[name="units"]:checked').value;
        toggleInputFields(units);
        // Update welcome message after changing units
        welcomeMessage.innerHTML = `
            <h3 class="welcome_message_title">Welcome!</h3>
            <p class="welcome_message_text">Enter your height and weight and you will see your BMI result here.</p>
        `;
    });

    // Upon page load, hide input fields for imperial units
    toggleInputFields('metric');
});