const express = require('express')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "strangerthings"
const zod = require("zod")
const mongoose = require("mongoose")

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");


const app = express();
app.use(express.json())

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/courses" , courseRouter)


app.listen(3000)