"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Rooms_controllers_1 = __importDefault(require("../controllers/Rooms_controllers"));
const router = express_1.default.Router();
router.get("/allRooms", Rooms_controllers_1.default.getallRooms);
router.get("/getRoombyid", Rooms_controllers_1.default.getRoombyId);
router.post("/addRooms", Rooms_controllers_1.default.RegisterRooms);
router.delete("/deleteRoom/:id", Rooms_controllers_1.default.deleteRooms);
exports.default = router;
