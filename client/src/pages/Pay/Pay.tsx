import React, { useEffect, useState } from 'react';
import { loadStripe, StripeCardElementOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Pay.scss";
import { useCreatePaymentMutation } from '../../redux/query/orders';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51L6BMwKt5nOB3xoQuoX7DPnQfmfBRJMETTraBsdZpqK3dx0w1ImRo918FaPRZGKEjfcB7ZMY9Lq8TreliUe7NzQH009NvcQtEz");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { gigId } = useParams();

  const [ createPayment, { error } ] = useCreatePaymentMutation();

  useEffect(() => {
    const pay = async() => {
      try {
        if(!gigId) {
          return console.log("Invalid gig Id")
        }
        const payload = await createPayment(gigId).unwrap();
        console.log("fulfilled", payload);
        setClientSecret(payload.clientSecret)
      } catch (error: any) {
        console.error("error", error);
      }
    }
    pay();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Pay;