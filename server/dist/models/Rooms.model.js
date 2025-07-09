"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Rooms_schema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Not available"
    },
    city: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    max_count: {
        type: Number,
        required: true,
        default: 0
    },
    image: [{
            type: String,
            default: null
        }],
    Rateperday: {
        type: Number,
        required: true
    },
    current_booking: [{
            type: String,
        }],
    hotel_type: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Rooms = mongoose_1.default.model("Room", Rooms_schema);
exports.default = Rooms;
