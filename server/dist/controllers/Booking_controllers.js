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
exports.PostAllBookings = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.stripe_secret_key) {
    console.log("stripe key is missing");
}
const stripe = require("stripe")(process.env.stripe_secret_key);
const PostAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, totalAmount, id, from_date, to_date, totaldays } = req.body;
        console.log(title);
        //adding some checkcases---->
        if (!title || !totalAmount || !id || !from_date || !to_date || !totaldays) {
            res.status(404).json({ msg: "Missing fields" });
            return;
        }
        if (totaldays < 0) {
            res.status(400).json({ msg: "Invalid total days 2" });
        }
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: title,
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            metadata: {
                title,
                totalAmount,
                id,
                from_date,
                to_date,
                totaldays,
            },
        });
        // Room booking
        res.status(201).json({ id: session.id });
        return;
    }
    catch (err) {
        console.log("error : ", err);
    }
});
exports.PostAllBookings = PostAllBookings;
