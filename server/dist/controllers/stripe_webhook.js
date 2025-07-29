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
const Bookings_model_1 = __importDefault(require("../models/Bookings.model"));
const Rooms_model_1 = __importDefault(require("../models/Rooms.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = require("stripe")(process.env.stripe_secret_key);
const stripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let event;
    const sig_header = req.headers["stripe-signature"];
    const payload = req.body;
    try {
        event = stripe.webhooks.constructEvent(payload, sig_header, process.env.stripe_webhooks_secret);
    }
    catch (err) {
        console.log("stripe webhook failed ", err);
        res.status(400);
    }
    if (event.type == "checkout.session.completed") {
        const session = event.data.objects;
        const session_id = session.id;
        const { title, totalAmount, id, from_date, to_date, totaldays } = session.metadata;
        const booking = new Bookings_model_1.default({
            room: title,
            room_id: id,
            from_date,
            to_date,
            totalAmount,
            totaldays,
            transaction_id: session_id,
        });
        yield booking.save();
        const currentRoom = yield Rooms_model_1.default.findById(id);
        currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.current_booking.push({
            booking_id: booking._id,
            from_date,
            to_date,
        });
        yield (currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.save());
        res.status(201).json({ msg: "Room has been booked!" });
    }
});
exports.default = stripeWebhook;
