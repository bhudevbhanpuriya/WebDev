const {JWT_USER_PASSWORD} = require("../config")
const jwt = require("jsonwebtoken")

async function userMiddleware(req,res,next) {
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_USER_PASSWORD)

    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        return res.status.json({
            message : "Unauthorised user"
        })
    }
}

module.exports ={
    userMiddleware:userMiddleware
}