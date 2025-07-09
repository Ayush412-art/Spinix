import {useState , useEffect} from 'react'
import axios from 'axios'
import { hoteldataProp } from '../components/Interfaces'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
// import StripeCheckout from 'react-stripe-checkout';
// import Checkout_page from '../components/Checkout_page'
import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'

const  BookingPage = () => {
    const [data , SetData] = useState<hoteldataProp | null>(null)
    const {id} = useParams();  
    const location = useLocation();
    const {todate , fromdate , rentperday , max_count , total_days} = location.state || {};


    // fetching the rooms data...
 
    const fetchData  = async() =>{
        try{
                const res = await axios.get<hoteldataProp>(`http://localhost:5055/admin/getRoombyid/${id}`);
                SetData(res.data)
                console.log(res.data);
                 
        }
        catch(err){
            console.error(err);
        }

    }
        const total_amount = rentperday * total_days  

        //payment integration

        const PaymentHandler = async() =>{
            try{

                const stripe = await loadStripe("pk_test_51RFcrLCyC355yaA8ehNrK9Bd2lyv33gaGxaP89hpu65uuHoh1x90aUWdKJFILhYSj5vxtU1HTfBAMf1xQzO0rosY00ZXPYgpBh");
                 
                const response : any = await axios.post("http://localhost:5055/api/bookrooms" , {
                         title : data?.title,
                        //  id : data?._id,    
                        //  from_date : fromdate,
                        //  to_date : todate,
                         totalAmount : total_amount,
                        //  totaldays : total_days,
     
     
                     })
                 
                     const session = response.data;
                     console.log("this is your session id" , session.id);
     
                     const result = await stripe?.redirectToCheckout({
                         sessionId : session.id
                     })

                     if(result?.error){
                         console.error(result.error.message)
                         
                     }
            }
            catch(err){
                console.log("Error occured during payments " , err)
            }
             


        }
          
        // const bookRooms = async()=>{
        //     try{
        //         const response = await axios.post("http://localhost:5055/api/bookrooms" , {

        //             title : data?.title,
        //             id : data?._id,    
        //             from_date : fromdate,
        //             to_date : todate,
        //             totalAmount : total_amount,
        //             totaldays : total_days,


        //         })

        //         if(response.status == 201){
        //             console.log("Room booked !")
        //         }
                

        //     }
        //     catch(err : any){
        //         console.log(err)
        //     }

        // }  


    useEffect(()=>{

        fetchData();
        
        
    } , [])
    
 
    

  return (
  <section className="w-[80%] h-screen mx-auto">
    <div className='flex justify-between '>
        <h1 className='text-3xl font-light'>{data?.title}</h1>
        <p className='text-xl font-medium'>Booking details</p>
    </div>
    <hr />
    <div className='flex mt-5 justify-between'>
        <div className='w-1/2'>
        <img className='h-[440px] w-[550px]' src={data?.image[0]} alt='img'></img>
        </div>
    <div className='grid w-1/2 text-end gap-y-0.5'>
        <p>Name : Ayush Singh</p>
        <p>From date : {todate}</p>
        <p>To date : {fromdate}</p>
        <p>max-count : {max_count}</p>
        <p className='text-xl font-medium mt-8'>Amount</p>
        <hr />
        <p>total days : {total_days}</p>
        <p>Rent per day : {rentperday}</p>
        <p className='text-xl font-medium'>Total amount : {total_amount}</p>
        <button onClick={PaymentHandler}  className='px-4 py-2 text-lg bg-black hover:bg-gray-800  rounded-lg text-white'>Pay now</button>

            {/* <StripeCheckout 
                token={tokenHandler}
                stripeKey = "pk_test_51RFcrLCyC355yaA8ehNrK9Bd2lyv33gaGxaP89hpu65uuHoh1x90aUWdKJFILhYSj5vxtU1HTfBAMf1xQzO0rosY00ZXPYgpBh"
                shippingAddress
                amount={total_amount*100}
                currency='INR'
                name='Spinix'

            /> */}
            {/* <Elements  stripe={stripePay}>
                    <Checkout_page />
            </Elements>
    */}
    </div>
    </div>

  </section>
  )
}


export default BookingPage
