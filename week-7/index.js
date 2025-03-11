const express = require("express");   
const bcrypt = require("bcrypt")

const {UserModel , TodoModel} = require("./db")
const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "asdasd123"

const {z} = require("zod")

mongoose.connect("mongodb+srv://bhudev03:bhudev123@cluster0.frdi2.mongodb.net/todos-week-7")

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
    const requireBody = z.object({
        email : z.string().min(3).max(100),
        password : z.string().min(3).max(100),
        name : z.string().min(3).max(100)
    })


    const parsedDataWithSuccess = requireBody.safeParse(req.body)
    
    if(!parsedDataWithSuccess.success){
        res.json({
            msg : "Incorrect Format",
            error : parsedDataWithSuccess.error
        })
        return
    }

    const { email, password, name } = parsedDataWithSuccess.data;

    let errorPresent = false;
    try{
    const hashedPassword = await bcrypt.hash(password,5)
    console.log(hashedPassword);
    
        await UserModel.create({
            email : email,
            password : hashedPassword,
            name :name
        })
    }
    catch(e){
        return res.status(400).json({
            msg : "User Already Exists!"
        })
        errorPresent = true;
    }
    if(!errorPresent){
        res.json({
            msg: "You're Signed up"
        })
    }
   
});


app.post("/signin",async function(req, res) {
    const email = req.body.email
    const password = req.body.password

    response = await UserModel.findOne({
        email : email
    })

    if(!response){
        return res.status(403).json({
            msg : "User doesnt exist"
        })
    }

    const passwordMatch = await bcrypt.compare(password,response.password)

    
    if(passwordMatch){
        const token = jwt.sign({
            id : response._id.toString()
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