// Fetch Food Calories and Macros from Nutritionix API
async function getFoodCalories() {
    const foodQuery = document.getElementById('foodQuery').value;
    const appId = 'fffccd4f'; // Replace with your Nutritionix App ID
    const appKey = '4e7650560f913fe319761155a0279565'; // Replace with your Nutritionix App Key
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const headers = {
        'Content-Type': 'application/json',
        'x-app-id': appId,
        'x-app-key': appKey
    };
    const body = {
        query: foodQuery
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (data.foods && data.foods.length > 0) {
            const food = data.foods[0]; // Get the first result
            const foodResultDiv = document.getElementById('foodResult');

            // Extract macronutrient data from the API response
            const protein = food.nf_protein || 0; // Protein in grams
            const fat = food.nf_total_fat || 0;  // Fat in grams
            const carbs = food.nf_total_carbohydrate || 0; // Carbs in grams
            const servingWeightGrams = food.serving_weight_grams || 0; // Serving size in grams

            // Display the food's calorie, macro, and serving size information
            foodResultDiv.innerHTML = `
                <p><strong>${food.food_name}:</strong></p>
                <p><strong>Serving Size:</strong> ${Math.round(servingWeightGrams)} grams</p>
                <p><strong>Calories:</strong> ${Math.round(food.nf_calories)} per serving</p>
                <p><strong>Protein (g):</strong> ${Math.round(protein)}</p>
                <p><strong>Fat (g):</strong> ${Math.round(fat)}</p>
                <p><strong>Carbs (g):</strong> ${Math.round(carbs)}</p>
            `;
        } else {
            alert('Food not found. Please try another query.');
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        alert('An error occurred while fetching food data.');
    }
}