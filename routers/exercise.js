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
            overviewImg: req.body.overviewImg,
            initVideo : req.body.initVideo,
            initImg : req.body.initImg,
            answerList: req.body.answerList,
            correctAnswer : req.body.correctAnswer,
            courseId: req.body.courseId,
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
// const schema = new mongoose.Schema({
//     order: {type: Number , required: true},
//     question: {type:String},
//     imageURL: {type:Array},
//     videoURL: {type: Array},
//     overviewImg:{type:String,default:""},
//     answerList: {type: Array},
//     correctAnswer: {type:Number, default: 0},
//     explaination: {type: String},
//     courseId:{type:String},
// }, {timestamps: true})

//             order,
//             question,
//             answerList,
//             overviewImg,
//             img,
//             video,
//             correctAnswer,
//             courseId,
//             explaination,
//             expImg
router.put("/update-exercise", async(req,res) => {
    try{    
        const exercise = await ExerciseModel.findByIdAndUpdate(
            req.body.exerciseId,{
                $set: { 
                    order: req.body.order,
                    question: req.body.question,
                    imageURL: req.body.img,
                    videoURL: req.body.video,
                    overviewImg: req.body.overviewImg,
                    initImg: req.body.initImg,
                    initVideo: req.body.initVideo,
                    answerList: req.body.answerList,
                    correctAnswer: req.body.correctAnswer,
                    explaination: req.body.explaination,
                    courseId: req.body.courseId,
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


router.delete("/:id", async (req, res) => {

    try {
        await ExerciseModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("The exercise has been deleted...");
    } catch (err) {
        return res.status(500).json(err);
    }
});
    
router.get("/:order", async(req, res) => {
    try{
        
        const exercise = await ExerciseModel.findOne({order: req.params.order})
        return res.status(201).json(exercise)
    } catch (err){
        res.status(500).json(err);
    }
})

router.get("/", async(req, res) => {
    try{
        const exerciseList = await ExerciseModel.find()
        return res.status(201).json(exerciseList)
    } catch (err){
        res.status(500).json(err )
    }
})


export default router