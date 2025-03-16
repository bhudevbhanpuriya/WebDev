const { Router } = require("express")
const {userModel} = require("../db")
const userRouter = Router()
const z = require("zod");
const bcrypt = require("bcrypt");

userRouter.post("/signup",async function(req,res){
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(3).max(30),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.status(400).json({
            message : "Invalid Input"
        })
        return
    }

    const {email , password , firstName , lastName} = parsedDataWithSuccess.data;

    let errorPresent = false;

    try{
        const hashedPassword = await bcrypt.hash(password,5)
        console.log(hashedPassword);

        await userModel.create({
            email : email,
            password : hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    }catch(e){
        return res.status(403).json({
            message : "User Already Present"
        })
        errorPresent = true;
    }

    if(!errorPresent){
        res.json({
            msg : "You are successfully signed-up"
        })
    }
   
})
    

userRouter.post("/signin",async function(req,res){
        
})
    
userRouter.get("/purchases",async function(req,res){
        
})
    

module.exports = {
    userRouter:userRouter
}