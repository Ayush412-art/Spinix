"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rooms_model_1 = __importDefault(require("../models/Rooms.model"));
const getallRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Rooms_model_1.default.find({});
        console.log(result);
        if (result.length < 1) {
            res.status(404).json({ msg: "No room is there!" });
            return;
        }
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const RegisterRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newroom = new Rooms_model_1.default(req.body);
        yield newroom.save();
        res.status(200).json({ msg: "A new room added in list" });
    }
    catch (err) {
        res.status(400).json("failed to add new room " + err);
    }
});
const getRoombyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Rooms_model_1.default.findOne({ _id: id });
        if (!result) {
            res.status(404).json({ msg: "room not found" });
        }
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const deleteRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Rooms_model_1.default.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ msg: "room not found" });
            return;
        }
        res.status(200).json({ msg: "Room's data deleted sucessfully" });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.default = { RegisterRooms, getallRooms, getRoombyId, deleteRooms };
