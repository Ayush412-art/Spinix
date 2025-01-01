import express from 'express';
import dotenv from 'dotenv';
import connection from './db/db';
import Rooms_Route from "../src/Routes/Rooms_Route"
const app = express();
dotenv.config();

connection().then(() => {
    console.log("db connected sucessfully");
    
})
.catch(()=>{
    console.log("error occured");
    
})

app.use(express.json())

app.use("/admin" , Rooms_Route)



app.listen("8000" , ()=>{
    console.log("server is running at port 8000");
    
})
