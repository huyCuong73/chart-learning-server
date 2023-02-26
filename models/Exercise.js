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
    imageURL:   {type:String},
    videoURL: {type: Array},
    answerList: {type: Array},
    correctAnswer: {type:Number, default: 0},
    explaination: {type: String},
    answerStat: {type: Number, default:0},
    firstAttempt: {type: Array}
}, {timestamps: true})

export const ExerciseModel = mongoose.model('exercises', schema)