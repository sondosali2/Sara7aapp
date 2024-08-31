import express from 'express'
const messagerouter=express.Router()
import * as messagecontroller from './message.controller.js'
import { auth } from '../../middeleware/auth.js'
messagerouter.post("/",messagecontroller.addmessage)
messagerouter.get("/get",auth,messagecontroller.getallmessages)





export default messagerouter