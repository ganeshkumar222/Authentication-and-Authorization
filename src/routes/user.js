import express from 'express'
import USERCONTROLLER from "../controller/user.js"
import HASH from '../helper/auth.js'

let router  = express.Router()

router.get("/getallstudents",HASH.authorize,HASH.adminguard,USERCONTROLLER.getUsers)
router.post("/createstudent",USERCONTROLLER.createStudent)
router.get("/getallstudents/:id",USERCONTROLLER.getStudent_by_id)
router.delete("/deletestudent/:id",HASH.authorize,HASH.adminguard,USERCONTROLLER.deletestudent)
router.put("/editstudent/:id",USERCONTROLLER.editUsers)
router.post("/login",USERCONTROLLER.login)
router.post("/checkpassword",USERCONTROLLER.checkpassword)
router.put("/changepassword",USERCONTROLLER.changepassword)
router.put("/forgetpassword",USERCONTROLLER.forgetpassword)
export default router