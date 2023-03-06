import express from "express";
const router = express.Router();
import { UserModel } from "../models/User.js";
import verify from "../middleware/verify.js";


router.put("/update-practice-progress", async(req, res) => {
    try{
        const userUpdated = await UserModel.findByIdAndUpdate(
            req.body.userId,{
                $set: { 
                    "progress.practice": req.body.updateData 
                }
            }

        )
        
        return res.status(201).json(userUpdated)
    } catch (err){
        res.status(500).json(err);
        console.log(err);
    }
})  

export default router