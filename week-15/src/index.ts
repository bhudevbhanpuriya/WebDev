import express from "express"
import { Application,Request, Response } from "express";
// express code
const app: Application = express();
app.use(express.json());

//zod code
import z, { boolean, ParseStatus } from "zod"

// .env code
import dotenv from "dotenv";
dotenv.config()

//JWT
const JWT = require("jsonwebtoken")
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD

//mongoose code
import mongoose from "mongoose"
import { userMiddlerware } from "./middleware";
const MONGO_URL : string = process.env.MONGO_URL || "undefined";

const {userModel} = require('./db')

//bcrypt
const bcrypt = require("bcrypt")


const userProfileSchema = z.object({
    firstName: z.string().min(1),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
            "Password must include uppercase, lowercase, number, and symbol"
        )
});


app.post('/api/v1/signup', async function (req : Request, res : Response) {
    const { success,error } = userProfileSchema.safeParse(req.body);

    if (!success) {
          res.status(411).json({
            msg: "Error in inputs",
            errors: error.errors 
        });
        return 
    }
    
    const {email , password , firstName , lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,5);  
    try {
        await userModel.create({
            email,
            password : hashedPassword,
            firstName,
            lastName
        });
    }
    catch(e){
        res.status(403).json({
            msg : "user already exists"
        })
        return
    }

    res.status(200).json({
        msg : "Signed up Success"
    })

})



app.put('/api/v1/signin',async (req : Request, res : Response) => {
    const { email , password } = req.body;
    const user = await userModel.findOne({
        email : email,
    })

    if(!user){
        res.status(403).json({
            msg : "User doesn't exist or wrong credentials"
        })
        return
    }

    const passwordMatch : boolean = await bcrypt.compare(password , user.password);
    if(passwordMatch){
        const token = JWT.sign({
            id : user._id
        },JWT_USER_PASSWORD);

        res.status(200).json({
            msg : "Signed-up Success",
            token : token
        })
        return
    }
    else{
        res.status(403).json({
            msg : "Invail Credentials"
        })
    }

})



app.post('/api/v1/content',userMiddlerware, (req:Request, res:Response) => {
    
})

app.get('/api/v1/content', (req, res) => {
    
})

app.delete('/api/v1/content', (req, res) => {
    
})

app.delete('/api/v1/brain/:shareLink', (req, res) => {
    
})


async function main() : Promise<void> {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connected to database");
        
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
    catch(e) {
        console.error("Failed to connect to database",e);
        
    }
}

main();




