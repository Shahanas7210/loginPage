const express=require("express");
const app=express();
const dotenv=require("dotenv");
const morgan=require("morgan"); 

const connectDB=require("./server/database/connection.js")

const userSchema=require("./server/model/schema");



dotenv.config({path:'config.env'})


const bodyParser=require("body-parser")
const port=process.env.port||3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const router=require("./server/routes/router")







app.set("view engine","ejs")

app.use(express.static('public'));
app.use(morgan("tiny"));
connectDB();

app.use("/",router)


app.use("*",(req,res)=>{
    res.send("Not found")
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})