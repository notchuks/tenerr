import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useUpdateConversationMutation } from '../../redux/query/conversation';
import { useFetchUserQuery } from '../../redux/query/fetchUser';
import { Conversation } from '../../utils/types';
import "./Message.scss";

const Message = ({ conversation }: { conversation: Conversation }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { data: sellerOrBuyer } = useFetchUserQuery(currentUser?.isSeller ? conversation.buyerId : conversation.sellerId);
  const [ updateConversation, { isLoading } ] = useUpdateConversationMutation();

  const handleRead = async (convoId: string) => {
    try {
      const payload = await updateConversation(convoId).unwrap();
      console.log("fulfilled", payload);
    } catch (error: any) {
      console.error("error", error);
    }
  }
  return (
    <>
      <tr className={(currentUser?.isSeller && !conversation.readBySeller) ? "active" : (!currentUser?.isSeller && !conversation.readByBuyer) ? "active" : ""}>
        <td>{sellerOrBuyer?.username}</td>
        <td>
          <Link to={`/conversation/${conversation.convoId}`} className="link">
            {conversation?.lastMessage?.substring(0, 100)}...
          </Link>
        </td>
        <td>1 day ago</td>
        <td>
          {((currentUser?.isSeller && !conversation.readBySeller) || (!currentUser?.isSeller && !conversation.readByBuyer)) && (
            <button onClick={() => handleRead(conversation.convoId)} >Mark as Read</button>
          )}
        </td>
      </tr>
    </>
  );
}

export default Message;