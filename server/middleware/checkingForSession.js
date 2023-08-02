const express=require("express");
const session=require("express-session");
const router=express.Router();

const checkSession=(req,res,next)=>{
    if(req.session.userId)
    {
        console.log(req.session.userId);
        next();
    }else{
        console.log("this is working");
     res.render('loginPage', { successFull: "Enter Your Login Details", type: "info" });
    }
}

module.exports=checkSession;