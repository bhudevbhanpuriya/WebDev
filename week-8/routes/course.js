const {Router} = require("express");
const courseRouter = Router()
const {courseModel} = require("../db")


courseRouter.get("/purchase",async function(req,res){ // where user purchases 
    
})
    
courseRouter.get("/preview",async function(req,res){
        
})
    
module.exports = {
    courseRouter:courseRouter
}