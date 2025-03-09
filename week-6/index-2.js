// using json web tokens

const express = require("express");

const jwt = require('jsonwebtoken')
const JWT_SECRET = "randompassword"

const app = express();
app.use(express.json())

const users = [];



app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        msg: "You're signed up"
    })

    console.log(users)
})


app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    // authentication password
    
    let findUser = null 
    for(let i=0 ;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
            findUser = users[i];
        }
    }

    if(findUser){
        const token = jwt.sign({
            username : username
        },JWT_SECRET); // converting username over to a jwt

        // findUser.token = token;
        res.json({
            token : token
        })
    }
    else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
    console.log(users)

})


app.get("/me",function(req,res){
    const token = req.headers.token
    const decodedInfo = jwt.verify(token,JWT_SECRET)
    const username = decodedInfo.username
    let foundUser = null

    for(let i=0;i<users.length;i++){
        if(users[i].username == username){
            foundUser = users[i]
        }
    }

    if(foundUser){
        res.json({
            username : foundUser.username,
            password : foundUser.password
        })
    }
    else{
        res.json({
            message : "Invalid Token"
        })
    }
})

app.listen(3000)