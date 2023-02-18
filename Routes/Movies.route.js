const { query } = require("express");
const express=require("express");
const { MovieModel } = require("../Models/Movie.model");


const MovieRouter=express.Router();

MovieRouter.get("/",async(req,res)=>{
    const query=req.query;
    const movies=await MovieModel.find(query);
    res.send(movies)
})
MovieRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    const note=new MovieModel(payload);
    await note.save()
    res.send({"msg":"Movie Added"})
})

MovieRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    console.log(ID)
    try {
        await MovieModel.findByIdAndUpdate({_id:ID},payload)
        res.send({"msg":"Movie updated successfully"})
        
    } catch (error) {
        res.send({"msg": "something went wrong","error":error.message})
    }
})

MovieRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id;

    // await MovieModel.findByIdAndDelete({_id:noteID})
    try {
        await MovieModel.findByIdAndDelete({_id:ID});
        res.send({"msg":"Movie delete"})
    } catch (error) {
        res.send(error)
    }
   
})

module.exports={
    MovieRouter }