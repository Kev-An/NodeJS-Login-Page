//Creating a server using Express

const express = require("express")
const app = express();
const collection = require("./dbconfig") //importing the collection variable
const PORT = 5000;

//middleware
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//get-post
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("*",(req,res)=>{
    res.send("cannot find the requested resource")
})

app.post("/signup",async(req,res)=>{
    const data = {
        name: req.body.username,
        password:req.body.password
    }
    //checking if user already exists
    const existingUser = await collection.findOne(data)
    if(existingUser){
        res.send("User already exists")
    }else{
        const userdata = await collection.insertMany(data)
        res.send("sign up successful")
        console.log(userdata)
    }
})
app.post("/login",async(req,res)=>{
    const data = {
        name: req.body.username,
        password:req.body.password
    }
    //authenticating user
    const authenticatingUsername = await collection.findOne(data)
    const authenticatingPassword = await collection.findOne(data)
    if(authenticatingUsername && authenticatingPassword){
        res.send("login successful")
    }else{
        res.send("invalid credentials")
    }
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
