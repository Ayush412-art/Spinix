
import { Request , Response} from 'express';
// import bookings from '../models/Bookings.model';
// import Rooms from '../models/Rooms.model';
const stripe = require("stripe")();



const PostAllBookings = async(req : Request , res : Response) : Promise<void> =>{
        try{

                const {title, totalAmount } = req.body;
                
                if(!title || !totalAmount ){
                   res.status(404).json({msg : "Missing fields"})
                   return;
                }
               
        
                // if(totaldays < 0 ){
                //     res.status(400).json({msg : "Invalid total days 2"})
                // }

                const session = await stripe.checkout.sessions.create({
                    payment_method_types : ['card'],

                    line_items : [
                      {
                        price_data : {
                            currency : "inr",

                            product_data : {
                                name : title,
                            },

                            unit_amount : totalAmount * 100,
                        },
                            quantity : 1,

                      },
                    ],
                    mode : "payment",
                    success_url : "http://localhost:5173/Homepage",
                    cancel_url : "http://localhost:5173/cancel"
                })


            // Room booking
                // const booking =  new bookings({
                //     room : title,
                //     room_id : id,
                //     from_date ,
                //     to_date,
                //     totalAmount,
                //     totaldays,
                //     transaction_id : "12345",
                
                // })
                
                //  await booking.save();

                //  const currentRoom  = await Rooms.findById(id);
                //  currentRoom?.current_booking.push({
                //     booking_id : booking._id,
                //     from_date,
                //     to_date
                // })

                // await currentRoom?.save();

                res.status(201).json({id : session.id});
                return;
        }
        catch(err){
            console.log("error : " ,  err);
        }

}
export default PostAllBookings;