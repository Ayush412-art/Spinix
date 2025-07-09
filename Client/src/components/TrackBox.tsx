
import { trackProp } from "./Interfaces"
function TrackBox(prop : trackProp) {
            console.log(prop);
  return (
    <main className="bg-white p-5 text-lg my-5 mx-3 font-medium  text-black"> 
                <p>Place : {prop.eventTitle}</p>
                <p>Date : {prop.date}</p>

                <div className="flex justify-around">

                        <p>Start-Time : {prop.startTime}</p>
                        <p>End-Time : {prop.endTime}</p>
            
                </div>
    </main>
  ) 
}

export default TrackBox
