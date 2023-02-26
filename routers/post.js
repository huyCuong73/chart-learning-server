import express from "express";
const router = express.Router();
import { PostModel } from "../models/Post.js";
import jwt from "jsonwebtoken"



router.post("/create-post", async(req,res) => {
    try{    
        const newPost = new PostModel({
            title : req.body.title,
            thumnailImg : req.body.thumnailImg,
            date : req.body.date,
            des : req.body.des,
            content: req.body.content
        })
        
        const post = await newPost.save();
        res.status(201).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
  
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json(err);
      }
    //   res.status(403).json("You are not allowed!");
    }
);

router.delete("/:id", async (req, res) => {
    
      try {
        await PostModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("The post has been deleted...");
      } catch (err) {
        return res.status(500).json(err);
      }
  });
  

router.get("/:id", async(req,res) => {
    try{
        const post = await PostModel.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get("/", async(req,res) => {
    try{
        const list = (await PostModel.find()).reverse()
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})



export default router