import mongoose from "mongoose";

const Rooms_schema = new mongoose.Schema({

    title : {
        type : String,
        required : true
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
        type : String,
    }] ,
    hotel_type : {
        type : String,
        required : true
    }

} , {timestamps : true})

const Rooms = mongoose.model("Room" , Rooms_schema)
export default Rooms;