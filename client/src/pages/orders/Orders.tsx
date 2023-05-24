import { skipToken } from "@reduxjs/toolkit/dist/query";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';
import { useFetchOrdersQuery } from "../../redux/query/orders";
import { Order } from "../../components";
import "./Orders.scss";

const Orders = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const { data: orders, error, isFetching, isSuccess } = useFetchOrdersQuery(); 
  console.log(orders);

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h2>Orders</h2>
        </div>
        {isFetching ? "Loading" : error ? "Something went wrong" : (<table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Contact</th>
          </tr>
          {orders?.map((order) => (
            <Order order={order}/>
          ))}
        </table>)}
      </div>
    </div>
  );
};

export default Orders;
