const express=require("express");
const router=express.Router();
const axios=require("axios");

const controller=require("../controller/controller");


router.get("/",(req,res)=>{
    res.render("loginPage",{ title: "Login Page" });
})

router.get("/register",(req,res)=>{
    res.render("addUser",{ title: "Register User" });
})

router.get("/updateUser",(req,res)=>{
    axios.get("http://localhost:3001/api/users",{params:{id:req.query.id}})
    .then((userdata)=>{
        res.render("updateUser",{title:"Update User",user:userdata.data})
    }).catch((ex)=>{
        res.send(ex)
    })
    // res.render("updateUser",{title:"Update User"});
})

router.get("/userDetails",(req,res)=>{
    axios.get("http://localhost:3001/api/users")
    .then((result) => {
        console.log(result.data);
        res.render("userDetails",{users:result.data})
    }).catch((err) => {
        res.send(err)
    });
   
});

//API
router.post("/api/users",controller.create);
router.get("/api/users",controller.find);
router.put("/api/users/:id",controller.update);
router.delete("/api/users/:id",controller.delete);


module.exports=router;