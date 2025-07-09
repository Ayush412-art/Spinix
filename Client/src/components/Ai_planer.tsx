import { useState } from "react"
import axios from "axios"
import bg_trip from "../assets/bg-trip.jpeg"
import TrackBox from "./TrackBox"
import { trackProp } from "./Interfaces"
function Ai_planer() {
    const [location , setLocation] = useState("")
    const [startDate , setstartDate ] = useState("")
    const [endDate , setendDate ] = useState("")
    const [response , Setresponse] = useState([]);


    const formHandler = async(e : React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        const formData = new FormData(e.currentTarget)
        setLocation(formData.get('location') as string)
        setstartDate(formData.get('start_date') as string)
        setendDate(formData.get('end_date') as string)

       const res : any =  await axios.post("http://localhost:5055/openai/chat" , {
          position : location,
          startdate : startDate,
          enddate : endDate
        },
      )
            if(!res){
                console.log("response failed!!");
            }

            //fetching the data from backend
           
               console.log("Frontend-data" , res.data);
              Setresponse(res.data);
             
      }

      catch(err){
        console.log("failed to send credintials" , err);
      }

    }

  return (
    <section className=" min-h-screen w-full bg-slate-100 py-8">
      <h1 className="text-2xl text-center md:text-4xl mb-5">Plan Your Trip Here </h1>
      <main className="h-full w-[80%] mx-auto ">
        <div className="text-gray-500 flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 items-center p-4">
         <form onSubmit={(e)=>formHandler(e)}>

          <input
            type="text"
            placeholder="Search location"
            id="search-planer"
            name="location"
            className="w-full sm:w-[300px] px-3 py-3 rounded-2xl bg-white hover:bg-slate-100 focus:outline-none"
          />
          <input
            type="date"
            name="start_date"
            className="w-full sm:w-auto px-3 py-3 rounded-2xl bg-white hover:bg-slate-100 focus:outline-none"
          />
          <input
            type="date"
            name="end_date"
            className="w-full sm:w-auto px-3 py-3 rounded-2xl bg-white hover:bg-slate-100 focus:outline-none"
          />
          <button type="submit" className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-all">
            Search
          </button>
         </form>
        </div>

        <div className="mt-10 flex">
                <img src={bg_trip} alt="image" className="rounded my-auto h-[50px] w-[50px]" />
               <p className="font-bold text-4xl m-5 ">Travel Planner✈️</p>
        </div>

          <div className="grid grid-cols-4">
            {
             response && response.map((value : trackProp)=>(
                <TrackBox endTime={value.endTime} startTime={value.startTime} eventTitle={value.eventTitle} date={value.date} />
             ))
            }

          </div>
        
        


      </main>
    </section>
  );
}

export default Ai_planer;
