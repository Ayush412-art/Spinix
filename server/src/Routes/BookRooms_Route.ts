import express from 'express';
import { PostAllBookings } from '../controllers/Booking_controllers';
import stripeWebhook from '../controllers/stripe_webhook';

const router = express.Router();


router.post("/addPayment" , PostAllBookings )
router.post("/stripe/webhook" , express.raw({ type: 'application/json' }) ,stripeWebhook )

export default router