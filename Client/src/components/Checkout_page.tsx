
import {CardElement , useStripe , useElements} from "@stripe/react-stripe-js";
import axios from 'axios';
import React from "react";
function Checkout_page() {
    const stripe = useStripe();
    const element = useElements();

    const stripeHandler = async(e:React.FormEvent) =>{
        e.preventDefault();

        if(!stripe || !element) return;
        
        const cardElement = element.getElement(CardElement);

        const {error , paymentMethod} = await stripe.createPaymentMethod({
            
            type : "card",
            card : cardElement!
        })
        
        if(error){
            console.log("payment error : " , error);
            return;
        }

        const res : any = axios.post("http://localhost:5055/api/payment" , {
            paymentID : paymentMethod.id,
            amount : "5000"
        })
       
        if(res.data.status == '200'){
            // sweet alert
            console.log("Payment sucessfull")
        }

    }

  return (
    <main>
        <form onSubmit={stripeHandler}>
            <div className="p-4 border border-gray-300 rounded-md shadow-sm w-full">

            <CardElement options={{style :{
                base : {
                    fontSize : "1.5rem",
                    color : "black",

                }
            }}}/>
            
            </div>
            <button type="submit" className="bg-black text-white p-2 rounded mt-4">Pay</button>
        </form>
    </main>
  )
}

export default Checkout_page;
