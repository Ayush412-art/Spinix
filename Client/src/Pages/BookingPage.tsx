import { useState, useEffect } from 'react';
import axios from 'axios';
import { hoteldataProp } from '../components/Interfaces';
import { useParams, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const BookingPage = () => {
  const [Data, SetData] = useState<hoteldataProp | null>(null);
  const { id } = useParams();
  const location = useLocation();
  const { todate, fromdate, rentperday, max_count, total_days } = location.state || {};

  const fetchData = async () => {
    try {
      const res = await axios.get<hoteldataProp>(`http://localhost:5055/admin/getRoombyid/${id}`);
      SetData(res.data);
    
    } catch (err) {
      console.error(err);
    }
  };

  const total_amount = rentperday * total_days;

  const PaymentHandler = async () => {
    try {
      const stripe = await loadStripe(
        'pk_test_51RFcrLCyC355yaA8ehNrK9Bd2lyv33gaGxaP89hpu65uuHoh1x90aUWdKJFILhYSj5vxtU1HTfBAMf1xQzO0rosY00ZXPYgpBh'
      );
      const response: any = await axios.post('http://localhost:5055/api/addPayment', {
        title : Data?.title,
        totalAmount: total_amount,
        id ,
        from_date : fromdate,
        to_date : todate,
        totaldays : total_days
      });

      const session = response.data;

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (err : any) {
      console.log('Error occured during payments ', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="w-[90%] max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">{Data?.title}</h1>
        <p className="text-xl text-gray-700">Booking Details</p>
      </div>

      <hr className="mb-6 border-gray-300" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-[440px] object-cover rounded-xl shadow-lg"
            src={Data?.image[0]}
            alt="room"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="space-y-2 text-gray-700 text-lg">
            <p>Name: <span className="font-medium">Ayush Singh</span></p>
            <p>From Date: <span className="font-medium">{todate}</span></p>
            <p>To Date: <span className="font-medium">{fromdate}</span></p>
            <p>Max Count: <span className="font-medium">{max_count}</span></p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-right text-lg">
            <p>Total Days: <span className="font-medium">{total_days}</span></p>
            <p>Rent Per Day: <span className="font-medium">₹{rentperday}</span></p>
            <p className="text-xl font-semibold">Total Amount: ₹{total_amount}</p>

            <button
              onClick={PaymentHandler}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
