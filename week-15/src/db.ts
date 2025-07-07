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
    type : String,
    link : URL,
    
})

const userModel = mongoose.model('user',userSchema);

module.exports = {
    userModel
}