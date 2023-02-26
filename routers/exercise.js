import express from "express";
const router = express.Router();
import { ExerciseModel } from "../models/Exercise.js";
import verify from "../middleware/verify.js";


router.post("/create-exercise", async(req,res) => {
    try{    
        const newExercise = new ExerciseModel({
            order: req.body.order,
            question: req.body.question,
            imageURL : req.body.img,
            videoURL: req.body.video,
            answerList: req.body.answerList,
            correctAnswer : req.body.correctAnswer,
            explaination: req.body.explaination,
            answeredStat: req.body.answeredBy,
            firstAttempt: []
        })
        
        const exercise = await newExercise.save();
        res.status(201).json(exercise);
    }catch(err){
        res.status(500).json(err)
        console.log(err);
    }
})

router.put("/check-answer", async(req,res) => {
    try{    
        const exercise = await ExerciseModel.findByIdAndUpdate(
            req.body.exerciseId,{
                $push: { firstAttempt: 
                    {
                        userId: req.body.userId,
                        checkAnswer: req.body.checkAnswer,
                    } 
                }
            }

        )
        
        res.status(201).json(exercise);
    }catch(err){
        res.status(500).json(err)
        console.log(err);
    }
})



router.post("/", async(req, res) => {
    if(req.headers.token){
        console.log(req.body.exerciseNo)
        let sample = 0;
        if(sample < req.body.exerciseNo){
            sample = req.body.exerciseNo
        }

        try{
            const exercises= await ExerciseModel.aggregate(
                [
                    {
                        $sort : { order : 1 }
                    },
                    {
                        $limit: sample + 1,
                    }
                ]
                )
            
            return res.status(201).json(exercises)
        } catch (err){
            res.status(500).json(err);
        }    
    } else {
        try{
            const exercises= await ExerciseModel.aggregate(
                [
                    {
                        $sort : { order : 1 }
                    },
                    {
                        $limit: 4,
                    }
                ]
            )
            
            return res.status(201).json(exercises)
        } catch (err){
            res.status(500).json(err);
        }          
    }
    })

    
    router.get("/:id", async(req, res) => {
        try{
            const exercise = await ExerciseModel.findById(req.params.id)
            return res.status(201).json(exercise)
        } catch (err){
            res.status(500).json(err);
        }
    })
export default router