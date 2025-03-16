const {JWT_ADMIN_PASSWORD} = require("../config")
const jwt = require("jsonwebtoken")

async function adminMiddleware(req,res,next) {
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD)

    if(decoded){
        req.adminId = decoded.id
        next()
    }else{
        return res.status.json({
            message : "Unauthorised admin"
        })
    }
}

module.exports ={
    adminMiddleware:adminMiddleware
}