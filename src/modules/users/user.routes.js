import express from 'express'
const router=express.Router()
import * as usercontroller from './user.controller.js'
router.post("/signup",usercontroller.signup)
router.post("/signin",usercontroller.signin)


router.get("/verify/:token",usercontroller.verifyemail)





export default router