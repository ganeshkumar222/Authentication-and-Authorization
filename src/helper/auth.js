import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const SALT = 10

let createHash = async(data) =>{
    let salt = await  bcrypt.genSalt(SALT)
    let hash =  await bcrypt.hash(data,salt)
    return hash
}

let checkpassword = async (data,hash) =>{
   return await bcrypt.compare(data,hash)
}

let authorization = async(payload) =>{
    let token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
   
    return token
}

let decode = async (token) =>{
   
    return await jwt.decode(token)
}

let authorize = async(req,res,next) =>{
   
    let token = await req?.headers?.authorization?.split(" ")[1]
    
    if(token){
        let payload = await decode(token)
        let current = +new Date()
        if(Math.floor(current/1000)<payload.exp){
            next()
        }
        else{
            res.status(402).send({
                message:"session expired"
            })

        }
     
    }
    else{
        res.status(402).send({
            message:"unauthorized accesss"
        })
    }

}
let adminguard = async (req,res,next) =>{
    
    let token = await req?.headers?.authorization?.split(" ")[1]
    if(token){
        let payload = await decode(token)

        if(payload.role==="admin"){
           
            next()
        }
        else{
            res.status(402).send({
                message:"only admins are allowed"
            })

        }
     
    }
    else{
        res.status(402).send({
            message:"unauthorized accesss"
        })
    }

}
export default{
    createHash,
    checkpassword,
    authorization,
    authorize,
    adminguard
}