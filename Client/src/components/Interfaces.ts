
export interface ReviewProp {
    name : string,
    description : string,
    address : string,
    url: string
}
export  interface trackProp {
        date : string,
        eventTitle : string,
        startTime : string,
        endTime : string 
}
interface bookings {
    from_date : string,
    to_date : string,
    booking_id : string
 }
    export interface hoteldataProp {
        _id : string,
    room_id : string,
    title : string,
    description : string,
    city : string,
    number : number,
    max_count : number,
    addressLink : string,
    details : string,
    image : string[],
    Rateperday : number,
    current_booking ?: bookings[],
    hotel_type : string,
    createdAt ?: string,
    updatedAt ?: string,
   

}
 

export interface roomProp {
    data: hoteldataProp,
    toDate ?: string,
    fromDate ?: string
    totaldays ?: Number
}