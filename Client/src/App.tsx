import { BrowserRouter, Route, Routes } from "react-router-dom";
 import LandingPage from "./components/LandingPage";
 import HomePage from "./Pages/HomePage";
import 'flowbite'
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import BookingPage from "./Pages/BookingPage";
import Ai_planer from "./components/Ai_planer";
import Success from "./components/Success";
import Cancel from "./components/Cancel";


function App() {
  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route path="/"  element = {<LandingPage />}></Route>
      <Route path="/Homepage" element = { <HomePage />}></Route>
      <Route path="/Login" element = {<LoginPage />} ></Route>
      <Route path="/Signup" element = {<SignUp />}></Route>
      <Route path="/BookingRoom/:id" element = {<BookingPage />}></Route>
      <Route path= "/Ai_planer" element = {<Ai_planer />}></Route>
      <Route path="/success" element = {<Success />}></Route> 
      <Route path="/cancel" element = {<Cancel/>}></Route>
    </Routes>
    
    </BrowserRouter>
   
    </>
  );
}

export default App;
