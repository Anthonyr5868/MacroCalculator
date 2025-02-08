// Fetch Food Calories and Macros from Nutritionix API
async function getFoodCalories() {
    const foodQuery = document.getElementById('foodQuery').value;
    const servingSize = parseFloat(document.getElementById('servingSize').value); // Get serving size in grams
    const appId = 'fffccd4f'; // Replace with your Nutritionix App ID
    const appKey = 'f816c3a9ed3b9579106996f245c87c21'; // Replace with your Nutritionix App Key
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    
    const headers = {
        'Content-Type': 'application/json',
        'x-app-id': appId,
        'x-app-key': appKey
    };

    const body = {
        query: foodQuery,
        num_servings: servingSize // Pass the serving size to the API
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
            const standardServingSize = food.serving_weight_grams || 100; // Default to 100g if no standard size available
            const proteinPerServing = food.nf_protein || 0; // Protein in grams
            const fatPerServing = food.nf_total_fat || 0;  // Fat in grams
            const carbsPerServing = food.nf_total_carbohydrate || 0; // Carbs in grams
            const caloriesPerServing = food.nf_calories || 0; // Calories per serving

            // Calculate scaled values based on user input for serving size
            const scaledProtein = (servingSize / standardServingSize) * proteinPerServing;
            const scaledFat = (servingSize / standardServingSize) * fatPerServing;
            const scaledCarbs = (servingSize / standardServingSize) * carbsPerServing;
            const scaledCalories = (servingSize / standardServingSize) * caloriesPerServing;

            // Display the food's calorie, macro, and serving size information
            foodResultDiv.innerHTML = `
                <p><strong>${food.food_name}:</strong></p>
                <p><strong>Serving Size:</strong> ${Math.round(servingSize)} grams</p>
                <p><strong>Calories:</strong> ${Math.round(scaledCalories)} kcal</p>
                <p><strong>Protein:</strong> ${Math.round(scaledProtein)} g</p>
                <p><strong>Fat:</strong> ${Math.round(scaledFat)} g</p>
                <p><strong>Carbs:</strong> ${Math.round(scaledCarbs)} g</p>
            `;
        } else {
            alert('Food not found. Please try another query.');
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        alert('An error occurred while fetching food data.');
    }
}