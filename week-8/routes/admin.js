const {Router} = require("express")
const adminRouter = Router()

const {adminModel} = require("../db")

const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const JWT_USER_PASSWORD = "things"


adminRouter.post("/signup",async function(req,res){
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
    
            await adminModel.create({
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
                msg : "Admin successfully signed-up"
            })
        }
       
})

adminRouter.post("/signin",async function(req,res){
    const {email , password} = req.body

        const response = await adminModel.findOne({
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
                message : "Yay! Admin Signed-In",
                token : token
            })
        }
        else{
            return res.status(403).json({
                message : "Invalid password or user"
            })
        }
})

adminRouter.post("/",async function(req,res){
    
})


adminRouter.post("/bulk",async function(req,res){
    
})

module.exports = {
    adminRouter : adminRouter
}