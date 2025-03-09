const express = require("express");

const {UserModel , TodoModel} = require("./db")
const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdasd123"

mongoose.connect("mongodb+srv://bhudev03:bhudev123@cluster0.frdi2.mongodb.net/todo-remiss-2")

const app = express();
app.use(express.json());


app.post("/signup", async function(req, res) {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email : email,
        password : password,
        name :name
    })

    res.json({
        msg: "You're Signed up"
    })

});


app.post("/signin",async function(req, res) {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email : email,
        password : password
    })

    console.log(user);
    

    if(user){
        const token = jwt.sign({
            id : user._id
        },JWT_SECRET)
    }
    else{
        res.status(403).json({
            msg : "Invalid Credentials"
        })
    }
});


app.post("/todo", function(req, res) {

});


app.get("/todos", function(req, res) {

});

app.listen(3000);