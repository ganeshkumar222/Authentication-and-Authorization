import express from 'express'
import INDEXCONTROLLER from '../controller/index.js'
import USERROUTES from './user.js'
let router = express.Router()
router.get("/",INDEXCONTROLLER.homepage)

router.use("/student",USERROUTES)
export default router