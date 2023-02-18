const express =require("express");
const {connection}=require("./db")
const {userRouter}=require("./Routes/user.routes")
const {authenticate}=require("./middleware/authentication.middleware");
const { MovieRouter } = require("./Routes/Movies.route");
require("dotenv").config();
const cors=require("cors")

const app=express();
app.use(cors())
app.use(express.json());


app.use("/",userRouter);
app.use(authenticate);
app.use("/",MovieRouter)



app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log(`server is running at prot ${process.env.Port}`)
    } catch (error) {
        console.log("something went wrong","error:",error.message);
    }
})