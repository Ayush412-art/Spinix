import mongoose from 'mongoose';

const Booking_Schema = new mongoose.Schema({

    room_id : {
        type : String,
    },
    room : {
        type : String,
        required : true    
    },
    from_date : {
        type : String,
        required : true 
    },
    to_date : {
        type : String,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true,
    },
    totaldays : {
        type : Number,
        required : true
    },
    transaction_id : {
        type : String,
       
    },
    status : {
        type : String,
        default : "Booked"
    }

} , {
    timestamps : true
})

const bookings = mongoose.model("bookings" , Booking_Schema);
export default bookings;