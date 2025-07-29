"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Booking_Schema = new mongoose_1.default.Schema({
    room_id: {
        type: String,
    },
    room: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        required: true
    },
    to_date: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    totaldays: {
        type: Number,
        required: true
    },
    transaction_id: {
        type: String,
    },
    status: {
        type: String,
        default: "Booked"
    }
}, {
    timestamps: true
});
const bookings = mongoose_1.default.model("bookings", Booking_Schema);
exports.default = bookings;
