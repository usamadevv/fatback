const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    days: [{
        day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
        meals: {
            breakfast: [{
                item: { type: String, required: true },
                description: { type: String },
                carbs: { type: String, required: true },
                protein: { type: String, required: true },
                fat: { type: String, required: true },
                calories: { type: String, required: true }
            }],
            lunch: [{
                item: { type: String, required: true },
                description: { type: String },
                carbs: { type: String, required: true },
                protein: { type: String, required: true },
                fat: { type: String, required: true },
                calories: { type: String, required: true }
            }],
            dinner: [{
                item: { type: String, required: true },
                description: { type: String },
                carbs: { type: String, required: true },
                protein: { type: String, required: true },
                fat: { type: String, required: true },
                calories: { type: String, required: true }
            }]
        }
    }]
}, { timestamps: true });

const DietPlan = mongoose.model('DietPlan', DietPlanSchema);

module.exports = DietPlan;
