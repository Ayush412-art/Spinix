import { Request, Response } from "express";
import bookings from "../models/Bookings.model";
import Rooms from "../models/Rooms.model";
import dotenv from "dotenv";
dotenv.config();
const stripe = require("stripe")(process.env.stripe_secret_key);

const stripeWebhook = async (req: Request, res: Response) => {
  let event: any;
  const sig_header = req.headers["stripe-signature"];
  const payload = req.body;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig_header,
      process.env.stripe_webhooks_secret
    );
  } catch (err) {
    console.log("stripe webhook failed ", err);
    res.status(400);
  }

  if (event.type == "checkout.session.completed") {
    const session = event.data.objects;
    const session_id = session.id

    const { title, totalAmount, id, from_date, to_date, totaldays } = session.metadata;
    
    const booking = new bookings({
      room: title,
      room_id: id,
      from_date,
      to_date,
      totalAmount,
      totaldays,
      transaction_id: session_id,
    })

       await booking.save();
        const currentRoom = await Rooms.findById(id);
            currentRoom?.current_booking.push({
              booking_id: booking._id,
              from_date,
              to_date,
            });
        
            await currentRoom?.save();
            res.status(201).json({ msg: "Room has been booked!" });



  }
};

export default stripeWebhook;