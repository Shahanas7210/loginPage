const express=require("express");
const router=express.Router();

const controller=require("../controller/controller");
const checkSession=require("../middleware/checkingForSession");
const checkUserRole=require("../middleware/checkingUserRole");
const isAdmin=require("../middleware/userIsAdmin");
const isManager=require("../middleware/userIsManager");
const userIsStaff = require("../middleware/userIsStaff");

router.post("/login",controller.login,checkUserRole);
router.get("/logout",controller.logout);
router.get("/",checkSession,checkUserRole);
router.get("/dashboard",checkSession,isAdmin,controller.renderDashboard);
router.get("/manager",checkSession,isManager,controller.renderManagerPage);
router.get("/staff",checkSession,userIsStaff,controller.renderStaffPage);
router.get("/register",checkSession,isAdmin,controller.renderRegisterPage);
router.get("/updateUser",checkSession,isAdmin,controller.renderUpdateUserPage);
router.get("/userDetails",checkSession,isAdmin,controller.renderUserDetails);


router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);
module.exports=router;

