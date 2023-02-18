const mongoose=require("mongoose")


const MovieSchema=mongoose.Schema({
    title:String,
    desc:String,
    YOR:Number,
    country:String
})

const MovieModel=mongoose.model("movies",MovieSchema)

module.exports={
    MovieModel
}