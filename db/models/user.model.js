import mongoose from "mongoose";
const user=mongoose.Schema({
    name:{
        type:String,
        minLength:[3,"Name is too short"],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verifiedid:{
        type:Boolean,
        default:false
    }
},{
    timeStamp:true
})
const usermodel=mongoose.model("user",user)
export default usermodel
