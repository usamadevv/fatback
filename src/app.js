const express = require("express");
const cors = require("cors");
const dotenv=require('dotenv')



const dbConnect= require('./dbConnect');

const sendEmail = require("./utils/sendEmail");
const userRouter = require("./routes/user.router");
const dietRouter = require("./routes/diet.router");
const progressRouter = require("./routes/progress.route");
// const planetsRouter = require("./routes/planets/planets.router");
dbConnect();
const app = express();
dotenv.config();
console.log(cors());
app.use(cors({
    origin:'*'
}));
app.use(express.json());
app.use(userRouter);

app.use(dietRouter);
app.use(progressRouter);




module.exports = app