const {Router} = require("express")
const adminRouter = Router()

const {adminModel, courseModel} = require("../db")

const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config")

const {adminMiddleware} = require("./middleware/admin");
const course = require("./course");


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
            },JWT_ADMIN_PASSWORD)

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

adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId = req.adminId

    const {title ,description , price ,imageUrl} = req.body

    const course = await courseModel.create({
        title:title,
        description:description,
        price:price,
        creatorId:adminId,
        imageUrl:imageUrl   
    })

    res.json({
        message: "Course created",
        courseId : course._id
    })

})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    
})

adminRouter.post("/course/bulk",adminMiddleware,async function(req,res){
    
})

module.exports = {
    adminRouter : adminRouter
}
