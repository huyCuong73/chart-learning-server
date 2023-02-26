import express from "express";
const router = express.Router();
import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken"



router.post("/register", async(req,res) => {
    try{    
        
        let checkEmail
        checkEmail = await UserModel.findOne({'email' : req.body.email})
        const checkPhoneNumber = await UserModel.findOne({'phoneNumber' : req.body.phoneNumber})
        
        if(checkEmail){
            return res.status(403).json("Email đã tồn tại")
        }else if(checkPhoneNumber){
            return res.status(405).json("Số điện thoại đã tồn tại")
        }else{
            const newUser = new UserModel({
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                password: req.body.password,
            })
            
            const user = await newUser.save();
           
            return res.status(201).json(user);
        }
                
        
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

router.post("/login", async(req, res) => {
    try {
        function getFormattedPhoneNumber( input ) {
            let output = "";
            input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
                {
                  if ( g1.length ) {
                    output += g1;
                    if ( g1.length == 3 ) {
                        output += "";
                        if ( g2.length ) {
                            output += " " + g2; 
                            if ( g2.length == 3 ) {
                                output += " ";
                                if ( g3.length ) {
                                    output += g3;
                                }
                            }
                        }
                     }
                  }
                }       
              );        
            return output;
        }   
        let user
        const userP = await UserModel.findOne({phoneNumber: getFormattedPhoneNumber(req.body.email)});
        const userM = await UserModel.findOne({email: req.body.email});

        
        if(userP){
            user = userP
            
        } else if (userM) {
            user = userM
        }else{
            return res.status(401).json("Nhập sai số điện thoại hoặc email")
        }
        
        
        if(user.password !== req.body.password){
            return res.status(401).json("Nhập sai mật khẩu")
        }
        
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, "pd", {expiresIn : "10d"})
        
        const {password,...info} = user._doc
        return  res.status(200).json({ ...info, accessToken})

    } catch (err) {
        return res.status(500).json(err)
    }
})


export default router