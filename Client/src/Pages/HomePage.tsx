import { useState, useEffect, useRef } from "react";
import Rooms from "../components/Rooms";
import axios from "axios";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
const { RangePicker } = DatePicker;
import { hoteldataProp } from "../components/Interfaces";
import dayjs from "dayjs";
import moment from "moment";

function HomePage() {
  const [rooms, setRooms] = useState<hoteldataProp[]>([]);
  const [toDate, Settodate] = useState("");
  const [fromDate, Setfromdate] = useState("");
  const [totaldays, Settotaldays] = useState(0);
  const [tempRooms, Settemprooms] = useState<hoteldataProp[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const dataHandler = async () => {
    try {
      const res: any = await axios.get("http://localhost:5055/admin/allRooms");
      setRooms(res.data);
      Settemprooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterbyDate: DatePickerProps["onChange"] = (dates, dateStrings) => {
    if (!dates) return;
    Setfromdate(dateStrings[0]);
    Settodate(dateStrings[1]);

   const startDay = dayjs(dateStrings[0], "DD-MM-YYYY");
    const endDay = dayjs(dateStrings[1], "DD-MM-YYYY"); 

    const days = endDay.diff(startDay, "days");
    Settotaldays(days);

    
  };



  const SearchLocationHandler = () => {

    if (!searchRef.current?.value) {
      alert("Please enter the location");
      searchRef.current?.focus();
    }
    if (!toDate || !fromDate) {
      alert("Select date");
    }

    const startDay = moment(fromDate, "DD-MM-YYYY");
    const endDay = moment(toDate, "DD-MM-YYYY");

    const tmp_rooms : any[] = [];

    for(let room of tempRooms){

      var avaliability = true;
      
      if(room.current_booking && room.current_booking?.length > 0){

          for(let booking of room.current_booking){
            const bookingStart = moment(booking.from_date, "DD-MM-YYYY");
            const bookingEnd = moment(booking.to_date, "DD-MM-YYYY");

            const result = startDay.isBetween(bookingStart , bookingEnd , undefined , "[]") ||
            endDay.isBetween(bookingStart  , bookingEnd , undefined , "[]") ||
            bookingStart.isBetween(startDay , endDay , undefined , "[]") ||
            bookingEnd.isBetween(startDay , endDay , undefined , "[]");

            if(result){
              avaliability = false;
              break;
            }
  
          }

      }
        if(avaliability){
          tmp_rooms.push(room)
        }

    }
    setRooms(tmp_rooms)
  };

  useEffect(() => {
    dataHandler();
  }, []);
  return (
    <>
      <section>
        <div className="relative">
          <img
            className="w-[95%] rounded-2xl my-5 mx-auto"
            src="bg_home.jpg"
            alt="bg-image"
          ></img>
          <div>
            <div className=" sm:flex space-x-3 absolute top-1/2 right-1/3 hidden text-grey-400 ">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search location"
                id="default-search"
                className="w-full px-3 py-3  rounded-2xl bg-white hover:bg-slate-100 focus:outline-none "
              />
              <RangePicker
                format={"DD-MM-YYYY"}
                onChange={filterbyDate}
                value={
                  fromDate && toDate
                    ? [
                        dayjs(fromDate, "DD-MM-YYYY"),
                        dayjs(toDate, "DD-MM-YYYY"),
                      ]
                    : null
                }
              />
              <button
                onClick={SearchLocationHandler}
                className="bg-black text-white px-5 py-1 rounded-2xl hover:bg-gray-900"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 w-[80%] mt-10 mx-auto">
          {rooms &&
            rooms.map((room) => (
              <Rooms
                key={room.room_id}
                totaldays={totaldays}
                data={room}
                toDate={toDate}
                fromDate={fromDate}
              />
            ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
