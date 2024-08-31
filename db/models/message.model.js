import mongoose from "mongoose";
const message=mongoose.Schema({
    messagetext:{
        type:String,
        minLength:[3,"message is too short"],
        required:true
    },
    recievedid:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
    },{
    timeStamp:true
})
const messagemodel=mongoose.model("message",message)
export default messagemodel
