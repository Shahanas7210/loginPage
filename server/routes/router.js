const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
let userDb = require("../model/schema");

const controller = require("../controller/controller");




router.get("/", (req, res) => {
    res.render("loginPage", { title: "Login Page" });
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(`email : ${email},password : ${password}`);
    try {

        const user = await userDb.findOne({ username: email }).exec();
        console.log(user);
        if(user.username===email&&user.password===password){
            res.status(200).send("Authentication successfully");

        }else{
            return res.status(400).send("Invalid username / password")

        }
        console.log(user.email);
    } catch (ex) {
        // console.error(ex);
        return res.status(500).send("Create a account this account is not found")


    }


})

router.get("/register", (req, res) => {
    res.render("addUser", { title: "Register User" });
})

router.get("/updateUser", (req, res) => {
    axios.get("http://localhost:3001/api/users", { params: { id: req.query.id } })
        .then((userdata) => {
            res.render("updateUser", { title: "Update User", user: userdata.data })
        }).catch((ex) => {
            res.send(ex)
        })

})

router.get("/userDetails", (req, res) => {
    axios.get("http://localhost:3001/api/users")
        .then((result) => {
            console.log(result.data);
            res.render("userDetails", { users: result.data })
        }).catch((err) => {
            res.send(err)
        });

});

//API for register page
router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);


//router for login page 

module.exports = router;