import express from "express";
const router = express.Router();
import { CommentModel } from "../models/Comment.js";


router.post("/post-comment", async (req,res) => {
    try{
        const newComment = new CommentModel({
            ...req.body
        })
        const comment = await newComment.save()
        res.status(201).json(comment);
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/:pageId", async (req,res) => {
    try{

        const comments = await CommentModel.find({
            pageId: req.params.pageId
        })
    
        res.status(201).json(comments)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
 
export default router


