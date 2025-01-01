import express from "express";
import Rooms_controllers from "../controllers/Rooms_controllers";
const router = express.Router()


router.get("/allRooms" , Rooms_controllers.getallRooms)
router.get("/getRoombyid" , Rooms_controllers.getRoombyId)
router.post("/addRooms" , Rooms_controllers.RegisterRooms )
router.delete("/deleteRoom/:id" , Rooms_controllers.deleteRooms)
export default router;