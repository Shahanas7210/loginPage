let userDb = require("../model/schema");

const checkUserRoll=async(req,res,next)=>{
    try{
        const username=req.body.email;
        const userFound=await userDb.findOne({username:username}).exec();
        if(!userFound){
            res.status(404).send("User not found");
        }

        if(userFound.userRoll=="Admin"){
            res.redirect("/dashboard");
        }else if(userFound.userRoll=="Manager"){
            res.send("Manager page");
        }else if(userFound.userRoll=="Staff"){
            res.send("Staff page")
        }
        return res.status(403).json({ error: 'Forbidden' });

        

    }catch(ex){
        console.log(ex.message);
    }
    next();
}


module.exports={checkUserRoll};