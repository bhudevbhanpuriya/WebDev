require("dotenv").config()
console.log(process.env.MONGO_URL);


const express = require('express')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "strangerthings"
const {z} = require("zod")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


const {userRouter} = require("./routes/user");
const {adminRouter} = require("./routes/admin");
const {courseRouter} = require("./routes/course");


const app = express();
app.use(express.json())

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/admin" , adminRouter);
app.use("/api/v1/courses" , courseRouter)

async function main(){
    console.log("connect to database");
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("listening on port 3000");
}

main()