const userModel=require("../model/schema");

const checkUserRole=(req,res,next)=>{
    const  loggedUser = req.session.userId;
    console.log(loggedUser);
    const userq=userModel.findOne({username:loggedUser}).exec();
    
    userq.then((user)=>{
        if(user.userRoll=="Admin"){
            res.redirect("/dashboard");
        }else if(user.userRoll=="Manager"){
            res.redirect("/manager")
        }else if(user.userRoll=="Staff"){
            res.redirect("/staff")
        }else{
            console.log("Invalid User Role!")
        }
        
    }).catch(ex=>{
           console.log(`Checking user role error : ${ex.message}`);
    })
}


module.exports=checkUserRole;