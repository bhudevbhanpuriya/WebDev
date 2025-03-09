const express = require('express');

const app = express();

//function that return a bool if age is allowable

function isAllowable(age){
    if(age >=14){
        return true;
    }
    else{
        return false;
    }
}

app.get('/ride1',function(req,res){
    if(isAllowable(req.query.age)){
        res.json({
            msg : "You have completed the ride 1"
        })
    }
    else{
        res.status(411).json({
            msg: " You are under-age for the ride 1"
        })
    }
    
})


app.get('/ride2',function(req,res){
    if(isAllowable(req.query.age)){
        res.json({
            msg : "You have completed the ride 2"
        })
    }
    else{
        res.status(411).json({
            msg: " You are under-age for the ride 2"
        })
    }+
    
})

app.listen(3000);