import UserModel from "../model/user.js"
import HASH from '../helper/auth.js'
import dotenv from 'dotenv'
import Mailer from "../helper/mail.js"
dotenv.config()

const getUsers = async (req,res) =>{
    try {
        let data = await UserModel.find({},{passwors:0})
        res.status(200).send({
            message:"data",
            data
        })
    } catch (error) {
       res.status(500).send({
        message:"Internal server error"
       }) 
    }
}
const createStudent = async (req,res)=>{
    try {
   
        let value = await UserModel.findOne({email:req.body.email})
      
        if(!value){
          
                req.body.password = await HASH.createHash(req.body.password)
            
                 await UserModel.create(req.body)
                res.status(200).send({
                    message:"student added successfully"
                })
        }
        else{
            res.status(400).send({
                message:"student already exists"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error",
            error
        })
    }
}
const getStudent_by_id = async (req,res) =>{
    try {
        // console.log(req.params.id)
        let value = await UserModel.findOne({_id:req.params.id},{password:0})
        if(value){
            res.status(200).send({
                message:"user data fetched successfully",
                value
            })
        }
        else{
            res.status(400).send({
                message:"the user does not exists"
            })
        }
    } catch (error) {
        
    }
}
const deletestudent = async (req,res)=>{
    try {

        let value = await UserModel.findOne({_id:req.params.id})
        if(value){
            await UserModel.deleteOne({_id:req.params.id})
            res.status(200).send({
                message:"student record deleted successfully"
            })
        }
        else{
            res.status(400).send({
                message:"student does not exist"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
const editUsers = async (req,res)=>{
    try {
        console.log("welcome")
        console.log(req.params.id)
        let value = await UserModel.findOne({_id:req.params.id})
        if(value){
            value.name=req.body.name
            value.email=req.body.email
            // value.password=req.body.password

            await value.save()

            res.status(200).send({
                message:"user edited successfully"
            })
            
        }
        else{
            res.status(400).send({
                message:"student does not exits"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"internal server error",
            error
        })
    }
}
const login = async (req,res) =>{
    try {
        let {email,password} = req.body
        let student = await UserModel.findOne({email:email})
        if(student){
             if(await HASH.checkpassword(password,student.password)){
                let token = await HASH.authorization({
                    name:student.name,
                    email:student.email,
                    role:student.role
                })
                res.status(200).send({
                    message:"logged in successfully",
                    token,
                    role:student.role,
                    id:student._id
                })
             }
             else{
                
                res.status(400).send({
                    message:"invalid password"
                })
             }
        }
        else{
            res.status(400).send({
                message:"student does not exist"
            })
        }
    } catch (error) {
        res.status(500).semd({
            message:"internal server error"
        })
    }
}

const checkpassword = async (req,res) =>{
  try {
    console.log(req.body)
    let student = await UserModel.findOne({_id:req.body.id})
    if(await HASH.checkpassword(req.body.password,student.password)){
        res.status(200).send({
            message:"passwors matched"
        })
    }
    else{
        res.status(400).send({
            message:"wrong password"
        })
    }
  } catch (error) {
    res.status(500).send({
        message:"internal server error"
    })
  }
}
const changepassword = async (req,res) =>{
    try {
        console.log(req.body)
        let student = await UserModel.findOne({_id:req.body.id})
        console.log(student)
        let password = await HASH.createHash(req.body.password)
        student.password = password
        await student.save()
        res.status(200).send({
            message:"password changed successfully"
        })
    } catch(error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}

const forgetpassword = async (req,res) =>{
    try {
       console.log(req.body)
       let student = await UserModel.findOne({email:req.body.email})
       let password = await Mailer.forgetpassword()
       let newpassword  = await HASH.createHash(password)
       student.password = newpassword
       await student.save()
       res.status(200).send({
        message:"email sent successfully"
       })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
        
    }
}

export default {
    getUsers,
    createStudent,
    getStudent_by_id,
    deletestudent,
    editUsers,
    login,
    checkpassword,
    changepassword,
    forgetpassword
}