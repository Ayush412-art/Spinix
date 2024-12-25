
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import TitleText from "./TitleText"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
import { Sponcers } from "./Sponcers"

const  LandingPage : React.FC = () => {
    const navigate = useNavigate();
  return (
    <>
    
   <section className=" relative bg-custom-pattern bg-custom-black h-screen">
   <Navbar />
    <div className="m-auto absolute left-0 right-0 top-0 bottom-1 h-full w-[80%] text-center">
       <div className="h-60 md:h-72 w-full">
        <TitleText />
       </div> 
       <div className="text-white ">
        <p className="text-2xl mb-2 text-pretty text-center tracking-wider "> Spinix makes hotel booking easy and affordable, offering cozy stays, verified amenities, and exclusive deals.<br/> Travel better with seamless bookings and unforgettable comfort! </p>
        <div className="flex justify-center mt-6 md:mt-4 ">
        <button onClick = {()   => navigate("/Login")} className="flex justify-center gap-1 text-xl  py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-full" >Get started  <ArrowRightIcon className="h-5 w-5 mt-1"/> </button>
        </div>

       </div>
    
    </div>

   </section>
   <Sponcers />
    </>
  )
}

export default LandingPage
