import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String},
    phoneNumber: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String, default: ""},
    progress:{type:Object , default:{
        practice: 0,
        course:0
    }},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})

export const UserModel = mongoose.model('User', schema)