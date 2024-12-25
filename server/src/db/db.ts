import mongoose from 'mongoose';


const connection = async()=>{
    try{
    const url : any  = process.env.MONGO_URL;
    if(!url){
        console.log("mongo url not found");
        
    }
    await mongoose.connect(url , {
    dbName : process.env.DB_NAME
    })


    }
    catch(err){
        console.log("Connection failed" , err);
        
    }


}
export default connection;