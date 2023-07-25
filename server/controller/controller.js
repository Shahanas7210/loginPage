const userDB = require("../model/schema");
// const { use } = require("../routes/router");

//create and save new user
exports.create = (req, res) => {
    //validate the req
    if (!req.body) {
        res.status(400).send({ message: "Content cant be empty" })
        return;
    }
    let isAdminVal;
    if(req.body.isAdmin=="on"){
          isAdminVal=true;
    }else{
           isAdminVal=false;
    }

    let isActiveVal;
    if(req.body.isActive=="on"){
        isActiveVal="true";
    }else{
        isActiveVal="false";
    }
 
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        isActive:isActiveVal,
        isAdmin:isAdminVal
    })
    user
    .save(user).then(data=>{
        // res.send(data)
        res.redirect("/")
    }).catch((ex)=>{
        res.status(500);
        console.log({
            message:ex.message||"Some error occur while creating user"
        });
    });

}

//Retrive and return data
exports.find = (req, res) => { 

if(req.query.id){
    const id=req.query.id;
    userDB.findById(id)
    .then((data)=>{
        if(!data){
            res.status(404).send({
                message:"User not found with "+id+"."
            })
        }else{
            res.send(data);
        }
    }).catch(ex=>{
        res.status(500).send({message:ex.message||"not getting the id"})
    })

}else{
    const id=req.params.id;

    userDB.find()
    .then(user=>{
        res.send(user)
    }).catch((ex)=>{
        // res.status(500).send({message:ex.message||"Error occur when the user data retriving"})
        res.render("addUser")
    })
}


}

//update a user
// exports. update = (req, res) => {
// if(!req.body){
//    return  res.status(400)
//     .send({message:"Data to update cant be emply"})
// }
// const id=req.params.id;
// userDB.findByIdAndUpdate(id,req.body)
// .then(data=>{
//    if(!data){
//     res.status(404).send({message:`Cannot update user eith ${id} or User not found !`})
//    }else{
//     res.send(data);
//    }
// }).catch((ex)=>{
//     res.status(500).send({message:ex.message||"Error to update user"})
// })

// }

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update cant be empty" });
    }
  
    const id = req.params.id;
  
    userDB.findByIdAndUpdate(id, req.body, { new: true }) // Add the { new: true } option
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Cannot update user with ${id} or User not found!` });
        } else {
          res.send(data);
        }
      })
      .catch(ex => {
        res.status(500).send({ message: ex.message || "Error updating user" });
      });
  };
  

//Delete user 
exports.delete = (req, res) => {
    const id=req.params.id;
    userDB.findByIdAndDelete(id,req.body,{ new: true })
    .then((data)=>{
        if(!data){
            res.status(404).send({message:`Cannot delete the user ${id}. Maybe if is wrong or not found`});
        }else{
              res
              .send({message:"User deleted successfully"})
        }
    }).catch(ex=>{
        res.send({message:ex.message||"Cannot delete the user"})
    })

}