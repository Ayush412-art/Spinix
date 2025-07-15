import mongoose from 'mongoose';
import {createClient , RedisClientType} from 'redis'

// Establishing redis connection 
     
     const redisClient : RedisClientType = createClient({
        url : "redis://127.0.0.1:6379" , 
        socket : {
            tls : false,
            reconnectStrategy: (attempts) => Math.min(attempts * 100, 3000),
        }
     }) 

        redisClient.on("error" , (err)=> console.log("Redis connection error ❌" , err))

//mongodb connection 
const connection = async()=>{
    try{
    const url : any  = process.env.MONGO_URL;
    if(!url){
        console.log("mongo url not found");
        
    }
    await mongoose.connect(url , {
    dbName : process.env.DB_NAME
    })
    console.log("Mongodb connection established ✅ ")


    }
    catch(err){
        console.log("Connection failed" , err);
        
    }
     (
        async()=>{
            try{
                    await redisClient.connect();
                    console.log("Redis connections is established ✅")
            }
            catch(err){
                    console.error("Redis connection faild ❌" , err);
            }
        }
     )()


}
export  {connection , redisClient};