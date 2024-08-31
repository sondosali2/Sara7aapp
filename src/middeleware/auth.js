import jwt from 'jsonwebtoken'

export const auth=async(req,res,next)=>{
    let token=req.header("token")
    jwt.verify(token,process.env.secret_key,(err,decoded)=>{
        if(err) return res.json({message:"Error",err})
            else{
            req.userId=decoded.id 
        next()}
    })
}