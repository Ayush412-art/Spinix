import express from 'express';
import PostAllBookings from '../controllers/Booking_controllers';

const router = express.Router();


router.post("/bookrooms" , PostAllBookings )

export default router