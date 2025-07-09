import React from "react"
import { useRef } from "react";
import axios from "axios";
export default function Contact() {
        const userRef = useRef<HTMLInputElement>(null);
        const emailRef = useRef<HTMLInputElement>(null);
        const msgRef = useRef<HTMLTextAreaElement>(null);
        
    const handlerForm  = async(e : React.FormEvent<HTMLButtonElement>)  => {
        console.log("hii");
        
        e.preventDefault();
        
        if(!userRef.current?.value){
            alert("Name is missing");
            userRef.current?.focus();
        }
        if(!emailRef.current?.value){
            alert("Email not found")
            emailRef.current?.focus();
        }
        try{
           const res : any = await axios.post(""  , {
                username : userRef.current?.value,
                email : emailRef.current?.value,
                msg : msgRef.current?.value
            })
            console.log(res);
            if(res.status == 200){
                alert("Request sent sucessfully");
            }
            

        }
        catch(error){
            console.log(error);
        }
        


    }
    

  return (
   <>
    <section className="bg-gray-900 pt-20">
   <hr className="mb-12 w-[10%] mx-auto border-dashed border-2 "/>
        
        <div className="mx-[90px] flex justify-around ">
            <div>
                <img className="h-[350px] w-[350px] shadow-xl shadow-gray-800" src="frontPic.jpg" alt="frontPic"></img>
            </div>
            <div>
            <p className="text-5xl tracking-wide font-medium text-white">Contact Us </p>
                    <form className="flex-col space-y-1 my-5">
                            <label className="text-lg text-white pt-2">Name</label><br></br>
                            <input ref={userRef} className="px-4 py-1 bg-transparent text-white border-[1px]" type="text" placeholder="Enter your name" /><br/>
                            <label className="text-lg text-white">Email</label><br></br>
                            <input ref={emailRef} className="px-5 py-1 bg-transparent text-white border-[1px]" type="text"  placeholder="Enter your email" /><br/>
                            <label className="text-lg text-white">Message</label><br/>
                            <textarea ref={msgRef} className="px-4 py-1 bg-transparent text-white border-[1px]" rows={4} cols={60}></textarea>
                    </form>  
                    <button onClick={handlerForm} className="px-4 py-2 text-lg bg-red-600 hover:bg-red-700 rounded-lg text-white">Submit</button>
                </div>
                                </div>
                
    </section>
   </>
  )
}
