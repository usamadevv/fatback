const DietPlan = require('../models/dietPlan.model');
const { openAI } = require('../utils/openAi.js'); // Assuming you have an OpenAI utility setup

// Function to Create Diet Plan
const createDietPlan = async (req, res, next) => {
    try {
        const user = req.body;


        // Generate the Diet Plan via ChatGPT API
        const prompt = `
        Based on the user's dietary preferences, age, height, weight, activity level, health goals, food allergies, and medical conditions,
        generate a 7 days healthy and balanced diet plan for a day including:
        - Breakfast, Lunch, and Dinner with food items, descriptions( in description explain the quantity and items), carbs, protein, fat, and calories. Return the plan as JSON.
        The user details:
        - Age: ${user.gender}
        - Age: ${user.age}
        - Height: ${user.height} cm
        - Weight: ${user.weight} kg
        - Activity Level: ${user.activityLevel}
        - Daily Sleep: ${user.dailySleep}
        - stress Level: ${user.stressLevel}
        - Budget: ${user.budgetPreference}
        - Target Weight: ${user.targetWeight}

        - Health Goals: ${user.healthGoals}
        - Dietary Preference: ${user.dietaryPreference}
        - Food Allergies: ${user.foodAllergies}
        - Medical Condition: ${user.medicalCondition}

Make sure to format the response as a JSON object following this structure and for 7 days make sure  .

     

        `


            ;

        const dietPlanResponse = await openAI(prompt); // Assuming `openAI` is your function that interacts with ChatGPT API
        console.log('start')
        console.log(dietPlanResponse.days)
        console.log('start')

        // Format and validate response (example)
        const dietPlan = {
            userId: '67a850d7009b4b0008ab033c',
            days: dietPlanResponse.days
        };

        // Save the Diet Plan in the database
        const newDietPlan = new DietPlan(dietPlan);
        await newDietPlan.save();

        return res.status(200).json({ message: "Diet plan created successfully!", data: newDietPlan });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create diet plan", error: error.message });
    }
};

const findDietPlan = async (req, res, next) => {

    try {
        const userId = req.body.userId; // Extract userId from request params

        // Find diet plan by userId
        const dietPlan = await DietPlan.findOne({ userId });

        if (!dietPlan) {
            return res.status(404).json({ message: "No diet plan found for this user." });
        }



        return res.status(200).json({ message: "Diet plan fetched successfully!", data: dietPlan });
    } catch (error) {
        console.error("Error fetching diet plan:", error);
        return res.status(500).json({ message: "Failed to fetch diet plan", error: error.message });
    }


}


const getAll = async (req, res, next) => {

    try {
     
        // Find diet plan by userId
        const dietPlan = await DietPlan.find({  });

        if (!dietPlan) {
            return res.status(404).json({ message: "No diet plan found for this user." });
        }



        return res.status(200).json({ message: "Diet plan fetched successfully!", data: dietPlan });
    } catch (error) {
        console.error("Error fetching diet plan:", error);
        return res.status(500).json({ message: "Failed to fetch diet plan", error: error.message });
    }


}
module.exports = {
    createDietPlan, findDietPlan,getAll
};
