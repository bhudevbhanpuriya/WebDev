const { Router } = require("express")
const {userModel, purchaseModel} = require("../db")
const userRouter = Router()
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config")

const {userMiddleware} = require("../middleware/user.js")

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
        const {email , password} = req.body

        const response = await userModel.findOne({
            email : email
        })

        if(!response){
            return res.status(403).json({
                message : "No such users exists"
            })
        }

        const passwordMatch = await bcrypt.compare(password,response.password)
          
        if(passwordMatch){
            const token = jwt.sign({
                id : response._id
            },JWT_USER_PASSWORD)

            res.json({
                message : "Yay! You're Signed-In",
                token : token
            })
        }
        else{
            return res.status(403).json({
                message : "Invalid password or user"
            })
        }
})
    

userRouter.get("/purchases",userMiddleware,async function(req,res){
        const userId = req.userId
        const purchases = await purchaseModel.find({
            userId
        })
        res.json({
            puchases : purchases
        })
})
    

module.exports = {
    userRouter:userRouter
}