const express=require("express");
const app=express();
const dotenv=require("dotenv");
const morgan=require("morgan"); 
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const session=require("express-session");

dotenv.config({path:'config.env'})

const userController=require("./server/controller/controller");
const connectDB=require("./server/database/connection.js")
const authRoutes=require("./server/routes/authRoutes");
const controller = require("./server/controller/controller");


const port=process.env.port||3001;

//Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.set("view engine","ejs")
app.use(express.static('public'));
app.use(morgan("tiny"));
connectDB();


app.use("/",authRoutes)



app.use("*",(req,res)=>{
    res.send("Page not found")
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})