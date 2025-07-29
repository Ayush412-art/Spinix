"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_controllers_1 = require("../controllers/Booking_controllers");
const stripe_webhook_1 = __importDefault(require("../controllers/stripe_webhook"));
const router = express_1.default.Router();
router.post("/addPayment", Booking_controllers_1.PostAllBookings);
router.post("/stripe/webhook", express_1.default.raw({ type: 'application/json' }), stripe_webhook_1.default);
exports.default = router;
