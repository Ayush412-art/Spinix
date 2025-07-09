import express , {Request} from 'express';
import dotenv from 'dotenv';
import{connection} from './db/db';
import Rooms_Route from "../src/Routes/Rooms_Route";
import userRouter from "../src/Routes/User_Route"
import bookingRouter from "../src/Routes/BookRooms_Route";
import OpenAi_Route from "../src/Routes/OpenAi_Route"

import cors from 'cors';
const app = express();

app.use(cors<Request>())
dotenv.config();

connection()

app.use(express.json())

app.use("/admin" , Rooms_Route);
app.use("/user" , userRouter);
app.use("/api" , bookingRouter);
app.use("/openai" , OpenAi_Route )



app.listen("5055" , ()=>{
    console.log("server is running at port 5055");
    
})
