const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
    console.log(token)
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                next();
            }else{
                res.send({"msg":"please Login"})
            }
        })
    }else{
        res.send({"msg":"please Login"})
    }
}

module.exports={
    authenticate
}