document.getElementById('progress-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const goal = document.getElementById('goal').value;
    const activityLevel = document.getElementById('activity-level').value;
    const fatPreference = document.getElementById('fat-preference').value;

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    let BMR;
    if (gender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Adjust for activity level
    let activityMultiplier;
    if (activityLevel === "active") {
        activityMultiplier = 1.75; // Active (4-7 exercises/week)
    } else if (activityLevel === "somewhat-active") {
        activityMultiplier = 1.4; // Somewhat Active (1-3 exercises/week)
    } else {
        activityMultiplier = 1.2; // Not Active (no exercise)
    }

    let dailyCalories = BMR * activityMultiplier;

    // Adjust for goal
    if (goal === "lose_weight") {
        dailyCalories -= 500; // Create a deficit
    } else if (goal === "gain_muscle") {
        dailyCalories += 500; // Create a surplus
    }

    // Macronutrient breakdown
    let proteinRatio = 0.3, carbRatio = 0.4, fatRatio = 0.3;

    // Adjust fat if user prefers less fat
    if (fatPreference === "yes") {
        proteinRatio = 0.35;
        carbRatio = 0.5;
        fatRatio = 0.15;
    }

    // Convert macros to grams
    const protein = Math.round((dailyCalories * proteinRatio) / 4);
    const carbs = Math.round((dailyCalories * carbRatio) / 4);
    const fats = Math.round((dailyCalories * fatRatio) / 9);

    // Display macro recommendations
    document.getElementById('macro-result').innerHTML = `
        <h2>Based on your inputs, here is how we suggest your daily goals to be:</h2>
        <p><strong>Calories:</strong> ${Math.round(dailyCalories)} kcal/day</p>
        <p><strong>Protein:</strong> ${protein} g/day</p>
        <p><strong>Carbs:</strong> ${carbs} g/day</p>
        <p><strong>Fats:</strong> ${fats} g/day</p>
    `;
});