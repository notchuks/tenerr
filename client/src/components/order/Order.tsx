import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import { useFetchUserQuery } from '../../redux/query/fetchUser';
import { Order } from "../../utils/types";
import "./Order.scss";

const Order = ({ order }: { order: Order }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const pesin = currentUser?.isSeller ? order.buyerId : order.sellerId
  const { data } = useFetchUserQuery(pesin);
  return (
    <>
      <tr key={order._id}>
        <td>
          <img className="image" src={order.img} alt="" />
        </td>
        <td>{order.title}</td>
        <td>{order.price}</td>
        <td>{data?.username}</td>
        <td>
          <img className="delete" src="/img/message.png" alt="" />
        </td>
      </tr>
    </>
  );
}

export default Order;