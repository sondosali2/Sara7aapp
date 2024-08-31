import express from 'express'
import mongoose from 'mongoose'
const connection=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/sarahapp').then(()=>{console.log("DB connected")}).catch((err)=>{console.log({message:"ERROR connecting DB",err});})
    }
    export default connection