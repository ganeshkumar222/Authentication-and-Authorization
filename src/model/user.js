import mongoose from './index.js'

let schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    role:{
        type:String
        
    }

    
},
{
    versionKey:false
  })

let UserModel = mongoose.model("students",schema)

export default UserModel