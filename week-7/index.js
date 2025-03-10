const express = require("express");

const {UserModel , TodoModel} = require("./db")
const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdasd123"

mongoose.connect("mongodb+srv://bhudev03:bhudev123@cluster0.frdi2.mongodb.net/todo-remiss-2")

const app = express();
app.use(express.json());

function auth(req,res,next){
    const token = req.headers.token;
    const decodeData = jwt.verify(token,JWT_SECRET);

    if(decodeData){
        req.userId = decodeData.id
        next();
    }
    else{
        res.status(403).json({
            msg : "Invalid Credentials"
        })
    }
}


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
            id : user._id.toString()
        },JWT_SECRET)

        res.json({
            token : token,
            msg : "You are signed in"
        })
    }
    else{
        res.status(403).json({
            msg : "Invalid Credentials"
        })
    }
});


app.post("/todo",auth,async function(req, res) {
    const userId = req.userId
    const title = req.body.title
    const done = req.body.done


    await TodoModel.create({
        userId,
        title,
        done
    })


    res.json({
        message : "Todo created"
    })
});


app.get("/todos",auth, async function(req, res) {
    const userId = req.userId

    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos,
    })
});

app.listen(3000);