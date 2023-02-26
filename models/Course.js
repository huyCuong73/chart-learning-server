import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {type:String, required: true},
    thumnailImg: {type: String},
    des: {type: String, default: ""},
    content: {type: String, required: true}
}, {timestamps: true})

export const CourseModel = mongoose.model('course', schema)
