const Progress = require("../models/progress.model");

// Get today's date in YYYY-MM-DD format
const getFormattedDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
};

// Get today's day name (e.g., "Monday")
const getDayName = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
};

// Create or update daily progress
const updateProgress = async (req, res) => {
    try {
        const {  updateMeal, status, totalCalories, totalCarbs, totalFats, totalProteins } = req.body;
        const userId=req.body.user.userId

        if (!userId || !updateMeal || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const today = getFormattedDate(); // Get current date (YYYY-MM-DD)
        let progress = await Progress.findOne({ userId, date: today });

        if (!progress) {
            // Create new progress entry if not found
            progress = new Progress({
                userId,
                day: getDayName(), // e.g., "Monday"
                date: today,
                breakfastStatus: updateMeal === "breakfast" ? status : "pending",
                lunchStatus: updateMeal === "lunch" ? status : "pending",
                dinnerStatus: updateMeal === "dinner" ? status : "pending",
                totalCalories: totalCalories || 0,
                totalCarbs: totalCarbs || 0,
                totalFats: totalFats || 0,
                totalProteins: totalProteins || 0
            });
        } else {
            // Update meal status
            if (updateMeal === "breakfast") progress.breakfastStatus = status;
            if (updateMeal === "lunch") progress.lunchStatus = status;
            if (updateMeal === "dinner") progress.dinnerStatus = status;

            // Increment nutrition totals if values are provided
            progress.totalCalories += totalCalories || 0;
            progress.totalCarbs += totalCarbs || 0;
            progress.totalFats += totalFats || 0;
            progress.totalProteins += totalProteins || 0;
        }

        await progress.save();
        return res.status(200).json({ message: "Progress updated successfully", data: progress });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating progress", error: error.message });
    }
};
const getProgress = async (req, res) => {
    try {

        const uid =req.body.user.userId

        const today = getFormattedDate(); // Get current date (YYYY-MM-DD)
        let progress = await Progress.findOne({ userId:uid, date: today });

        if (!progress) {
            // Create new progress entry if not found
            return res.status(401).json({ message: "nouser",});

        } 
        return res.status(200).json({ message: "success", data: progress });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error  progress", error: error.message });
    }
};

module.exports = { updateProgress,getProgress };
