
import { Request , Response } from "express"
import Rooms from "../models/Rooms.model"

const getallRooms = async(req: Request , res:Response) : Promise<void> =>{
        try{
            const result = await Rooms.find({})
            console.log(result);
            
            if(result.length < 1){
                res.status(404).json({msg : "No room is there!"})
                return;
            }
            res.status(201).json(result);

        }
        catch(err){
            res.status(400).json(err);
        }


}
const RegisterRooms = async(req:Request , res:Response) : Promise<void> =>{
   
    try{

            const newroom =  new Rooms(req.body);
            await newroom.save();
            res.status(200).json({msg : "A new room added in list"})
    }
    catch(err){
        res.status(400).json("failed to add new room " + err);
    }
}
const getRoombyId = async(req : Request , res : Response) : Promise<void> =>{
    try{
        const {id}  = req.params;
        const result = await Rooms.findOne({_id : id})
        if(!result){
            res.status(404).json({msg : "room not found"})
        }
        res.status(200).json(result);


    }
    catch(err){
        res.status(400).json(err)
    }
}
const deleteRooms = async(req : Request , res : Response) : Promise<void> =>{
        try{
            const {id}  = req.params;

            const result = await Rooms.findByIdAndDelete(id);
            
            if(!result){
              res.status(404).json({msg : "room not found"});
              return;
            }
            res.status(200).json({msg : "Room's data deleted sucessfully"})



        }
        catch(err){
            res.status(400).json(err);
        }
  

    
}  

export default {RegisterRooms , getallRooms , getRoombyId , deleteRooms };