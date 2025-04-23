const express = require('express');
const { verifyToken, verifyTokenAndGetUser } = require('../utils/token');
const { updateProgress, getProgress } = require('./progress.controller');
const progressRouter = express.Router();



progressRouter.post('/api/progress/update-progress',verifyTokenAndGetUser,updateProgress);
progressRouter.post('/api/progress/get-progress',verifyTokenAndGetUser,getProgress);

module.exports = progressRouter;
