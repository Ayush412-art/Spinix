import mongoose from "mongoose";

const Rooms_schema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    room_id : {
            type : String,
            default : 0,
           
    },
    details : {
            type : String,

    },
    addressLink : {
        type : String,
        requied : true
    },
    description : {
        type : String,
        default : "Not available"
    },
    city : {
        type : String,
        required : true
    }
    ,
    number : {
        type : Number,
        required : true
    },
    max_count : {
        type : Number,
        required : true,
        default : 0
    },
    image : [{
        type : String, 
        default : null
    }],
    Rateperday : {
        type : Number,
        required : true

    },
    current_booking : [{
        booking_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "bookings"
        },
        from_date : {
            type : String,
            required : true,

        },
        to_date : {
            type : String,
            required : true    
        }
    }] ,
    hotel_type : {
        type : String,
        required : true
    }

} , {timestamps : true})

const Rooms = mongoose.model("Rooms" , Rooms_schema)
export default Rooms;