import express from "express";
import  Router  from "./router.js";
import  Connection  from "./connection.js";
import dotenv from 'dotenv'

dotenv.config()//loads the environment variable from the .env file

const app = express();


app.use(express.static('../cliendside'))
app.use (express.json({limit:'50mb'}));
app.use ('/api',Router);



app.get('/',(req,res)=>{
    res.sendFile(path.resolve('../cliendside/index.html'))
})
Connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started at http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log(error);
    
})