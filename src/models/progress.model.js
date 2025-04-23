const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: String, required: true }, // Example: "Monday"
    date: { type: Date, }, // Date for tracking progress

    // Meal completion statuses
    breakfastStatus: { type: String },
    lunchStatus: { type: String},
    dinnerStatus: { type: String},

    // Total intake tracking
    totalCalories: { type: Number},
    totalCarbs: { type: Number },
    totalFats: { type: Number },
    totalProteins: { type: Number }
}, { timestamps: true });

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
