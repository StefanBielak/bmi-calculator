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
            const weightInPounds = weight;
            let feet, inches;
            if (heightInputs.length === 3) {
                feet = heightInputs[1].valueAsNumber;
                inches = heightInputs[2].valueAsNumber;
            } else {
                feet = heightInputs[0].valueAsNumber;
                inches = heightInputs[1].valueAsNumber;
            }
            const heightInInches = (feet * 12) + inches;
            return (weightInPounds / Math.pow(heightInInches, 2)) * 703;
        }
    }

    // Function to determine weight range for given height (metric)
    function weightRangeMetric(height) {
        if (height < 150) {
            return "40-55";
        } else if (height >= 150 && height < 160) {
            return "56-64";
        } else if (height >= 160 && height < 165) {
            return "54-68";
        } else if (height >= 165 && height < 170) {
            return "57-72";
        } else if (height >= 170 && height < 175) {
            return "61-76";
        } else if (height >= 175 && height < 180) {
            return "63-81";
        } else if (height >= 180 && height < 185) {
            return "67-85";
        } else if (height >= 185 && height < 220) {
            return "78-100";
        } 
    }

    // Function to determine weight range for given height (imperial)
    function weightRangeImperial(height) {
        if (height < 59) {
            return "6-8";
        } else if (height >= 59 && height < 63) {
            return "8-10";
        } else if (height >= 63 && height < 65) {
            return "9-11";
        } else if (height >= 65 && height < 67) {
            return "10-12";
        } else if (height >= 67 && height < 69) {
            return "11-13";
        } else if (height >= 69 && height < 71) {
            return "12-14";
        } else if (height >= 71 && height < 73) {
            return "13-15";
        } else if (height >= 73 && height < 78) {
            return "14-16";
        } else if (height >= 78 && height < 80) {
            return "15-17";
        } else {
            return "16+";
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

        // Check if both weight and height are entered
        if (!isNaN(weight) && !isNaN(height) && weight > 0 && height > 0) {
            // Calculate BMI
            const bmi = calculateBMI(weight, height, units);

            // Determine weight range for given height
            let weightRangeInfo;
            if (units === 'metric') {
                weightRangeInfo = weightRangeMetric(height);
            } else {
                weightRangeInfo = weightRangeImperial(height);
            }

            // Determine BMI category
            const bmiCategoryInfo = bmiCategory(bmi);

            // Display BMI result
            welcomeMessage.innerHTML = `
                <div>
                <h3 class="result_message_title">Your BMI is...</h3>
                <p class="result_bmi">${bmi.toFixed(2)}</p>
                </div>
                <p class="result_message_text">Your BMI falls within the ${bmiCategoryInfo} category. For your height, a weight range of ${weightRangeInfo} ${units === 'metric' ? 'kg' : 'st'} would result in a healthy BMI.</p>
            `;
        } else {
            // If some fields are not filled or contain invalid values, display standard welcome message
            welcomeMessage.innerHTML = `
                <h3 class="welcome_message_title">Welcome!</h3>
                <p class="welcome_message_text">Enter valid height and weight to see your BMI result here.</p>
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
            <p class="welcome_message_text">Enter valid height and weight to see your BMI result here.</p>
        `;
    });

    // Upon page load, hide input fields for imperial units
    toggleInputFields('metric');
});