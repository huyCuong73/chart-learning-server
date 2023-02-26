import express from "express";
const router = express.Router();
import { CourseModel } from "../models/Course.js";
import verify from "../middleware/verify.js";
import jwt from "jsonwebtoken"



router.post("/create-course", async(req,res) => {
    try{    
        const newCourse = new PostModel({
            title : req.body.title,
            thumnailImg : req.body.thumnailImg,
            des : req.body.des,
            content: req.body.content
        })
        
        const course = await newCourse.save();
        res.status(201).json(course);
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/:id", async(req,res) => {
    try{
        const course = await CourseModel.findById(req.params.id)
        res.status(200).json(course)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get("/", verify,async(req,res) => {
    try{
        const list = (await CourseModel.find()).reverse()
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }
})



export default router