import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app=express()
app.use(express.json())
import cors from 'cors'
app.use(cors())
import connection from './db/connection.js'
connection()
import router from './src/modules/users/user.routes.js'
import messagerouter from './src/modules/messages/message.routes.js'
import { apperror } from './utils/apperror.js'
import { globalerror } from './utils/globalerror.js'
app.use("/users",router)
app.use("/messages",messagerouter)

//handling routes error
app.use("*",(req,res,next)=>{
 //   res.json({err:`invalid url ${req.originalUrl}`})
 next(new apperror(`invalid url ${req.originalUrl}`,404))
})
//global error handling
app.use(globalerror)
app.listen(3000,()=>{
    console.log("Server is Running on port 3000");
})