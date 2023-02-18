const express=require("express");
const {UserModel}=require("../Models/user.model")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {email,pass,name}=req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                res.send({"msg":"something went wrong","error":err.message})
            }else{
                const user=UserModel({email,pass:hash,name})
                await user.save();
                res.send({"msg":"user register successfull"})
            }
        });
        
    } catch (err) {
        res.send({"msg":"something went wrong","error":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user.length>0){
        bcrypt.compare(pass, user[0].pass,(err, result)=> {
            if(result){
                const token=jwt.sign({course:"backend"},"masai");
                res.send({"msg":"Login successful","token":token})
            }else{
                res.send({"msg":"wrong credntial"})
            }
        });
    }      
        
    } catch (err) {
        res.send({"msg":"wrong credntial"})
    }
})


module.exports={
    userRouter
}