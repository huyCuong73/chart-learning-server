import mongoose from "mongoose";

// const attemptSchema = mongoose.Schema(
//     {
//         userID: [],
//         attempt: { type: Number, default: 0},
//         checkFirstAttemt: {type: Boolean, default: false}
//     }
// )

const schema = new mongoose.Schema({
    order: {type: Number , required: true},
    question: {type:String},
    imageURL: {type:Array},
    videoURL: {type: Array},
    overviewImg:{type:String,default:""},
    answerList: {type: Array},
    correctAnswer: {type:Number, default: 0},
    explaination: {type: String},
    courseId:{type:String},
    answerStat: {type: Number, default:0},
    firstAttempt: {type: Array}
}, {timestamps: true})

export const ExerciseModel = mongoose.model('exercises', schema)
