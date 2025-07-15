import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.stripe_secret_key) {
  console.log("stripe key is missing");
}
const stripe = require("stripe")(process.env.stripe_secret_key);

export const PostAllBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const session = await stripe.checkout.sessions.create({
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
  } catch (err) {
    console.log("error : ", err);
  }
};
