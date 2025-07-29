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
    room_id: {
        type: String,
        default: 0,
    },
    details: {
        type: String,
    },
    addressLink: {
        type: String,
        requied: true
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
            booking_id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "bookings"
            },
            from_date: {
                type: String,
                required: true,
            },
            to_date: {
                type: String,
                required: true
            }
        }],
    hotel_type: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Rooms = mongoose_1.default.model("Rooms", Rooms_schema);
exports.default = Rooms;
