import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments',
        required: false, 
    },
 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

    detail: {
        type: String,
        required: true,
    },  
}, {timestamps: true})

export const CommentModel = mongoose.model('comment', schema)
