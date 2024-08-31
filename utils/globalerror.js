
//global error handle
export const globalerror=((err,req,res,next)=>{
    console.log(err);
  process.env.mode=="dev" ? res.status(err.statuscode).json({err:err.message,stack:err.stack}) : res.json({err:err.message})
})