import mongoose from "mongoose";
const Schema = mongoose.Schema
const user_schema=  Schema({
    name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile_pic:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['active','inactive'] ,// 0 active 
        default:'active'
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    is_login:{
        type:String,
        enum:['login','logout'],
        default:"logout"
    }
    
},{timestamps:true}
)
const user_model = mongoose.model("user",user_schema)
export {user_model}