import mongoose, { Schema, Types } from "mongoose";
// Use ObjectId type
const ObjectId = Types.ObjectId;



const userSchema = new Schema({
    email : {type: String , unique:true},
    password : String,
    firstName : String,
    lastName : String
})

const contentSchema = new Schema({
    title : String,
    link : String,
    userId : [{
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    }]
})

const linkSchema = new Schema({
    //  hash it represents the shorten or hashed version of link
    hash : String,
    userId : [{
        type : mongoose.Types.ObjectId,
        ref: 'user',
        require : true,
        unique : true
    }]
})

const userModel = mongoose.model('user',userSchema);
const contentModel = mongoose.model('content',contentSchema)
const linkModel = mongoose.model('link',linkSchema) 


module.exports = {
    userModel,
    contentModel,
    linkModel
}