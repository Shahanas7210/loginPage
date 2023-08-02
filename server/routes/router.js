const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");
const session=require("express-session");
var Notify=function(){"use strict";var t=function(t){t.wrapper.classList.add("notify--fade"),setTimeout((function(){t.wrapper.classList.add("notify--fadeIn")}),100)},e=function(t){t.wrapper.classList.remove("notify--fadeIn"),setTimeout((function(){t.wrapper.remove()}),t.speed)},s=function(t){t.wrapper.classList.add("notify--slide"),setTimeout((function(){t.wrapper.classList.add("notify--slideIn")}),100)},i=function(t){t.wrapper.classList.remove("notify--slideIn"),setTimeout((function(){t.wrapper.remove()}),t.speed)};return function(){function o(t){var e=this;this.notifyOut=function(t){t(e)};var s=t.status,i=t.type,o=void 0===i?1:i,n=t.title,a=t.text,r=t.showIcon,c=void 0===r||r,h=t.customIcon,l=void 0===h?"":h,p=t.customClass,d=void 0===p?"":p,u=t.speed,f=void 0===u?500:u,m=t.effect,v=void 0===m?"fade":m,w=t.showCloseButton,y=void 0===w||w,L=t.autoclose,g=void 0!==L&&L,C=t.autotimeout,x=void 0===C?3e3:C,I=t.gap,E=void 0===I?20:I,Z=t.distance,b=void 0===Z?20:Z,B=t.position,M=void 0===B?"right top":B,N=t.customWrapper,O=void 0===N?"":N;this.customWrapper=O,this.status=s,this.title=n,this.text=a,this.showIcon=c,this.customIcon=l,this.customClass=d,this.speed=f,this.effect=v,this.showCloseButton=y,this.autoclose=g,this.autotimeout=x,this.gap=E,this.distance=b,this.type=o,this.position=M,this.checkRequirements()?(this.setContainer(),this.setWrapper(),this.setPosition(),this.showIcon&&this.setIcon(),this.showCloseButton&&this.setCloseButton(),this.setContent(),this.container.prepend(this.wrapper),this.setEffect(),this.notifyIn(this.selectedNotifyInEffect),this.autoclose&&this.autoClose(),this.setObserver()):console.error("You must specify 'title' or 'text' at least.")}return o.prototype.checkRequirements=function(){return!(!this.title&&!this.text)},o.prototype.setContainer=function(){var t=document.querySelector(".notifications-container");t?this.container=t:(this.container=document.createElement("div"),this.container.classList.add("notifications-container"),document.body.appendChild(this.container)),this.container.style.setProperty("--distance",this.distance+"px")},o.prototype.setPosition=function(){var t="notify-is-";"center"===this.position?this.container.classList.add(t+"center"):this.container.classList.remove(t+"center"),this.position.includes("left")?this.container.classList.add(t+"left"):this.container.classList.remove(t+"left"),this.position.includes("right")?this.container.classList.add(t+"right"):this.container.classList.remove(t+"right"),this.position.includes("x-center")?this.container.classList.add(t+"x-center"):this.container.classList.remove(t+"x-center"),this.position.includes("top")?this.container.classList.add(t+"top"):this.container.classList.remove(t+"top"),this.position.includes("bottom")?this.container.classList.add(t+"bottom"):this.container.classList.remove(t+"bottom"),this.position.includes("y-center")?this.container.classList.add(t+"y-center"):this.container.classList.remove(t+"y-center")},o.prototype.setCloseButton=function(){var t=this,e=document.createElement("div");e.classList.add("notify__close"),e.innerHTML='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.94 8 4.2-4.193a.67.67 0 0 0-.947-.947L8 7.06l-4.193-4.2a.67.67 0 1 0-.947.947L7.06 8l-4.2 4.193a.667.667 0 0 0 .217 1.093.666.666 0 0 0 .73-.146L8 8.94l4.193 4.2a.665.665 0 0 0 .947 0 .665.665 0 0 0 0-.947L8.94 8Z" fill="currentColor"/></svg>',this.wrapper.appendChild(e),e.addEventListener("click",(function(){t.close()}))},o.prototype.setWrapper=function(){var t;this.customWrapper?this.wrapper=(t=this.customWrapper,(new DOMParser).parseFromString(t,"text/html").body.childNodes[0]):this.wrapper=document.createElement("div"),this.wrapper.style.setProperty("--gap",this.gap+"px"),this.wrapper.style.transitionDuration=this.speed+"ms",this.wrapper.classList.add("notify"),this.wrapper.classList.add("notify--type-"+this.type),this.wrapper.classList.add("notify--"+this.status),this.autoclose&&this.wrapper.style.setProperty("--timeout",""+(this.autotimeout+this.speed)),this.autoclose&&this.wrapper.classList.add("notify-autoclose"),this.customClass&&this.wrapper.classList.add(this.customClass)},o.prototype.setContent=function(){var t,e,s=document.createElement("div");s.classList.add("notify-content"),this.title&&((t=document.createElement("div")).classList.add("notify__title"),t.textContent=this.title,this.showCloseButton||(t.style.paddingRight="0")),this.text&&((e=document.createElement("div")).classList.add("notify__text"),e.innerHTML=this.text.trim(),this.title||(e.style.marginTop="0")),this.wrapper.appendChild(s),this.title&&s.appendChild(t),this.text&&s.appendChild(e)},o.prototype.setIcon=function(){var t=document.createElement("div");t.classList.add("notify__icon"),t.innerHTML=this.customIcon||function(t){switch(t){case"success":return'<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m19.627 11.72-5.72 5.733-2.2-2.2a1.335 1.335 0 0 0-2.255.381 1.334 1.334 0 0 0 .375 1.5l3.133 3.146a1.333 1.333 0 0 0 1.88 0l6.667-6.667a1.334 1.334 0 1 0-1.88-1.893ZM16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.666 10.666 0 1 1 0-21.333 10.666 10.666 0 0 1 0 21.333Z"/></svg>';case"warning":return'<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M13.666 15A1.333 1.333 0 0 0 15 13.667V8.334a1.333 1.333 0 0 0-2.665 0v5.333A1.333 1.333 0 0 0 13.666 15Zm-.507 5.227c.325.134.69.134 1.014 0 .164-.064.314-.159.44-.28a1.56 1.56 0 0 0 .28-.44c.075-.158.111-.332.106-.507a1.333 1.333 0 0 0-.386-.946 1.53 1.53 0 0 0-.44-.28A1.333 1.333 0 0 0 12.334 19a1.4 1.4 0 0 0 .386.947c.127.121.277.216.44.28ZM13.666 27a13.333 13.333 0 1 0 0-26.667 13.333 13.333 0 0 0 0 26.667Zm0-24a10.667 10.667 0 1 1 0 21.333 10.667 10.667 0 0 1 0-21.333Z"/></svg>';case"error":return'<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24A10.667 10.667 0 0 1 5.333 16a10.56 10.56 0 0 1 2.254-6.533l14.946 14.946A10.56 10.56 0 0 1 16 26.667Zm8.413-4.134L9.467 7.587A10.56 10.56 0 0 1 16 5.333 10.667 10.667 0 0 1 26.667 16a10.56 10.56 0 0 1-2.254 6.533Z"/></svg>';case"info":return'<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 14.667A1.333 1.333 0 0 0 14.667 16v5.333a1.333 1.333 0 1 0 2.666 0V16A1.333 1.333 0 0 0 16 14.667Zm.507-5.227a1.333 1.333 0 0 0-1.014 0 1.334 1.334 0 0 0-.44.28c-.117.13-.212.278-.28.44a1.12 1.12 0 0 0-.106.507 1.333 1.333 0 0 0 .386.946c.13.118.279.213.44.28a1.333 1.333 0 0 0 1.84-1.226 1.4 1.4 0 0 0-.386-.947 1.334 1.334 0 0 0-.44-.28ZM16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.666 10.666 0 1 1 0-21.333 10.666 10.666 0 0 1 0 21.333Z"/></svg>'}}(this.status),(this.status||this.customIcon)&&this.wrapper.appendChild(t)},o.prototype.setObserver=function(){var t=this,e=new IntersectionObserver((function(e){e[0].intersectionRatio<=0&&t.close()}),{threshold:0});setTimeout((function(){e.observe(t.wrapper)}),this.speed)},o.prototype.notifyIn=function(t){t(this)},o.prototype.autoClose=function(){var t=this;setTimeout((function(){t.close()}),this.autotimeout+this.speed)},o.prototype.close=function(){this.notifyOut(this.selectedNotifyOutEffect)},o.prototype.setEffect=function(){switch(this.effect){case"fade":this.selectedNotifyInEffect=t,this.selectedNotifyOutEffect=e;break;case"slide":this.selectedNotifyInEffect=s,this.selectedNotifyOutEffect=i;break;default:this.selectedNotifyInEffect=t,this.selectedNotifyOutEffect=e}},o}()}();



var msg="User Logged in successfully"

router.use(cookieParser());

router.use(bodyParser.urlencoded({ extended: true }));
let userDb = require("../model/schema");

const controller = require("../controller/controller");

router.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
}));


router.post("/login", async (req, res) => {
    const {email,password}=req.body;
    const user = await userDb.findOne({ username: email }).exec();
    try{
       if(user&&user.password===password){
         req.session.userId=email;
         if(user.userRoll=="Admin"){
            res.redirect("/dashboard");
        }else if(user.userRoll=="Manager"){
            res.send(`Logged in the Manager page <a href="/logout">LogOut</a>`);
        }else if(user.userRoll=="Staff"){
            res.send(`Logged in the Staff page <a href="/logout">LogOut</a>`)
        }

       }else{
         res.render("loginPage",{successFull:"Please check your username & password",type:"error"})
       }
    }catch(ex){
     res.render("loginPage",{successFull:"Account not found !",type:"error"})
    }
 })

router.get("/", async (req, res) => {
    if(req.session.userId){
        var user = await userDb.findOne({ username: req.session.userId }).exec();
        if(user.userRoll=="Admin"){
            res.redirect("/dashboard");
        }else if(user.userRoll=="Manager"){
            res.redirect("/manager");
        }else if(user.userRoll=="Staff"){
            res.redirect("/staff")
        }
    }else{
        res.render("loginPage", { title: "Login Page",successFull:"Please login again",type:"warning"});
    }
})



router.get("/register",async (req, res) => {
    if(req.session.userId){
        var user = await userDb.findOne({ username: req.session.userId }).exec();
        if(user.userRoll=="Admin"){
            res.render("addUser", { title: "Register User" });
        }else{
            res.render('loginPage',{successFull:"Do not have the permission",type:"info"});
        }
    }else{
        res.render('loginPage',{successFull:"First You want to Login",type:"info"});
     }
   
})

router.get("/updateUser", async (req, res) => {
    if (req.session.userId) {
        var user = await userDb.findOne({ username: req.session.userId }).exec();
        if (user.userRoll == "Admin") {
            axios.get("http://localhost:3001/api/users", { params: { id: req.query.id } })
                .then((userdata) => {
                    res.render("updateUser", { title: "Update User", user: userdata.data })
                }).catch((ex) => {
                    res.send(ex)
                })

        }else{
            res.render('loginPage',{successFull:"Do not have the permission",type:"info"});
        }
    }else{
        res.render('loginPage',{successFull:"First You want to Login",type:"info"});
     }


})

router.get("/userDetails", async (req, res) => {
 if(req.session.userId){
    var user = await userDb.findOne({ username: req.session.userId }).exec();
    if(user.userRoll=="Admin"){
        axios.get("http://localhost:3001/api/users")
        .then((result) => {
            console.log(result.data);
            res.render("userDetails", { users: result.data })
        }).catch((err) => {
            res.send(err)
        });
    }else{
        res.render('loginPage',{successFull:"Do not have the permission",type:"info"});
    }

 }else{
    res.render('loginPage',{successFull:"First You want to Login",type:"info"});
 }
    

});

router.get("/dashboard",async(req,res)=>{
    if(req.session.userId){
        res.render("dashboard")
    }else{
        res.render('loginPage',{successFull:"Please login again",type:"info"});
    }
   
})

router.get("/logout",(req,res)=>{

    req.session.destroy((err) => {
        if (err) {
          console.error("Error while destroying session:", err);
        }else{
            console.log(`Session destroyed.`);
        }
        res.render("loginPage", {
          successFull: "User logout successfully",
          type: "success",
        });
      });
})

router.get("/manager",(req,res)=>{
    res.send(`Logged in the manage page <a href="/logout">LogOut</a>`)
});

router.get("/staff",(req,res)=>{
    res.send(`Logged in the staff page <a href="/logout">LogOut</a>`)
})


//API for register page
router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);


//router for login page 

module.exports = router;
