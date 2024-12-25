import express from 'express';
import dotenv from 'dotenv';
import connection from './db/db';
const app = express();
dotenv.config();


connection().then(() => {
    console.log("db connected sucessfully");
    
})
.catch(()=>{
    console.log("error occured");
    
})


app.listen("8000" , ()=>{
    console.log("server is ruuning at port 8000");
    
})
