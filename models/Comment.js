import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pageId: {
        type: ObjectId,
        required: true,
    },

    parentCommentId: {
        type: ObjectId,
        ref: 'comments',
        required: false, 
    },
 
    username: {
        type: String,
        required: true,
    },

    detail: {
        type: String,
        required: true,
    },  
}, {timestamps: true})

export const CourseModel = mongoose.model('comment', schema)
