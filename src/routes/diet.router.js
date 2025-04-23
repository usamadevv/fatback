const express = require('express');
const { createDietPlan, findDietPlan } = require('./diet.controller');
const { verifyToken, verifyTokenAndGetUser } = require('../utils/token');
const dietRouter = express.Router();

// POST endpoint to create diet plan
dietRouter.post('/api/diet/create', createDietPlan);


dietRouter.post('/api/diet/find',verifyTokenAndGetUser,findDietPlan);

module.exports = dietRouter;
