import { rmSync } from 'fs'
import messagemodel from '../../../db/models/message.model.js'
import usermodel from '../../../db/models/user.model.js'
//import { handleerror } from '../../middeleware/handlerror.js'

const addmessage=async(req,res)=>{
    try {
        let{messagetext,recievedid}=req.body
    let existed=await usermodel.findById(recievedid)
    if(existed){
    let added=await messagemodel.insertMany({messagetext,recievedid})
    res.json({message:"Added",added})
    }
    else{
        res.json("You should register first")
    }
    } catch (error) {
        res.json({message:"Error",error})
    }

}
const getallmessages=async(req,res)=>{
        let messages=await messagemodel.find({recievedid:req.userId})
        res.json({message:"here's your messages",messages})
        }
export {
    addmessage,getallmessages
}