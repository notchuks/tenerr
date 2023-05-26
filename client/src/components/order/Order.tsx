import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useCreateConversationMutation, useFetchConversationQuery } from '../../redux/query/conversation';
import { useFetchUserQuery } from '../../redux/query/fetchUser';
import { useCreateMessageMutation } from '../../redux/query/messages';
import { Order } from "../../utils/types";
import "./Order.scss";

const Order = ({ order }: { order: Order }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const pesin = currentUser?.isSeller ? order.buyerId : order.sellerId;
  const navigate = useNavigate();
  const { data } = useFetchUserQuery(pesin);

  const convoId = order.sellerId + order.buyerId;

  const { data: conversation, error: fetchError } = useFetchConversationQuery(convoId);
  console.log(conversation);
  console.log(fetchError);

  const [ createConversation, { error } ] = useCreateConversationMutation();


  const handleContact = async () => {
    conversation && navigate(`/conversation/${convoId}`);

    if(fetchError && "originalStatus" in fetchError) {
      if (fetchError.originalStatus === 404) {
        try {
          const payload = await createConversation({ to: currentUser?.isSeller ? order.buyerId : order.sellerId }).unwrap();
          console.log("fulfilled", payload);
          navigate(`/conversation/${payload.convoId}`)
        } catch (error: any) {
          console.error("error", error);
        }
      }
    }
    
  };

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
          <img className="delete" src="/img/message.png" alt="" onClick={handleContact} />
        </td>
      </tr>
    </>
  );
}

export default Order;