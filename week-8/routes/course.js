const {Router} = require("express");
const courseRouter = Router()
const {courseModel, purchaseModel} = require("../db")

const { userMiddleware } = require("../middleware/user")


courseRouter.post("/purchase",userMiddleware,async function(req,res){ // where user purchases 
    const { userId, courseId } = req.body
    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message : "You have successfully bought the course"
    })
})
    
courseRouter.get("/preview",async function(req,res){
        const courses = await courseModel.find({})
        res.json({
            courses : courses
        })
})
    
module.exports = {
    courseRouter:courseRouter
}