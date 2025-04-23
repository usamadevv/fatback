const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
       
        unique: true
    },
    email: {
        type: String,

        unique: true
    },
    status: {
        type: String,

    },
    password: {
        type: String,
   
    },
    age: {
        type: Number,
        
    },
    gender: {
        type: String,
        
    },
    resetToken: {
        type: String,
        
    },
    height: {
        type: Number, // in cm
        
    },
    weight: {
        type: Number, // in kg
        
    },
    activityLevel: {
        type: String,
        
    },
    dailySleep: {
        type: String,
        
    },
    stressLevel: {
        type: String,
        
    },
    dietaryPreference: {
        type: String,
    },
    healthGoals: {
        type: String,
        
    },
    targetWeight: {
        type: String,
        
    },
    foodAllergies: {
        type: String, // Array of allergy names
     
    },
    medicalCondition: {
        type: String, // Array of allergy names
     
    },
    budgetPreference: {
        type: String,
      
    },

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
