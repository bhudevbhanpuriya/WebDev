const { Router } = require("express")
const userRouter = Router()

userRouter.post("/signup",async function(req,res){
   res.json({
    msg : "inside user/signup"
   })
})
    
userRouter.post("/signin",async function(req,res){
        
})
    
userRouter.get("/purchases",async function(req,res){
        
})
    

module.exports = {
    userRouter:userRouter
}