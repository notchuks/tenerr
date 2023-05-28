import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Tick from "../../assets/tick.svg";
import { useUpdateOrderMutation } from '../../redux/query/orders';
import "./Success.scss";

const Success = () => {
  const [confirmError, setConfirmError] = useState("")
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  const [updateOrder, { error }] = useUpdateOrderMutation();

  useEffect(() => {
    const confirm = async () => {
      try {
        if (!payment_intent) {
          return console.log("Invalid payment intent");
        }
        const payload = await updateOrder({ payment_intent }).unwrap();
        console.log("fulfilled", payload);
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error: any) {
        console.error("error", error);
        setConfirmError(error.data);
      }
    }
    confirm();
  }, []);
  
  return (
    <div className="success">
      <img src={Tick} alt="Tick svg" className="tick" />
      <p>Payment successful. You are being redirected to your orders page. Please do not close this page.</p>
    </div>
  )
}

export default Success;