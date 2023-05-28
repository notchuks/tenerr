import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./Pay.scss";
import { useCreatePaymentMutation } from '../../redux/query/orders';
import { CheckoutForm } from '../../components';


const stripePromise = loadStripe("pk_test_51L6BMwKt5nOB3xoQuoX7DPnQfmfBRJMETTraBsdZpqK3dx0w1ImRo918FaPRZGKEjfcB7ZMY9Lq8TreliUe7NzQH009NvcQtEz");

export type StripeTypes = {
  clientSecret: string;
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: string
    }
  }
};

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { gigId } = useParams();
  console.log(gigId);

  const [ createPayment, { error } ] = useCreatePaymentMutation();

  useEffect(() => {
    let ignore = false;
    const pay = async() => {
      try {
        if(!gigId) {
          return console.log("Invalid gig Id")
        }
        if (!ignore) {
          const payload = await createPayment(gigId).unwrap();
          console.log("fulfilled", payload);
          setClientSecret(payload.clientSecret);
        }
      } catch (error: any) {
        console.error("error", error);
      }
    }
    pay();

    // using the cleanup function as a workaround for strictmode rendering each component twice.
    return () => {
      ignore = true;
    }
  }, []);

  const options: StripeTypes = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: '#008b8b'
      }
    }
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