const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        
    },
    date:{
        type:Date,
        default:Date.now()


    },
    isAdmin:{
        typeof:String
    }

})




const userDb=mongoose.model("userDetails",userSchema)
module.exports=userDb;