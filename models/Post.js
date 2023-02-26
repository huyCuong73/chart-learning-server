import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {type:String, required: true},
    thumnailImg: {type: String},
    date: {type: String, required: true},
    des: {type: String, default: ""},
    content: {type: String, required: true}
}, {timestamps: true})

export const PostModel = mongoose.model('post', schema)
