const express = require('express')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "strangerthings"
const zod = require("zod")
const mongoose = require("mongoose")



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
    await mongoose.connect("mongodb+srv://bhudev03:bhudev123@cluster0.frdi2.mongodb.net/course-selling-app")
    app.listen(3000)
    console.log("listening on port 3000");
    
}

main()