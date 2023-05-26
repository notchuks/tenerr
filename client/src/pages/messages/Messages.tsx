import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import { useFetchConversationsQuery } from '../../redux/query/conversation';
import "./Messages.scss";

const Messages = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const { data: conversations, error, isLoading } = useFetchConversationsQuery();
  console.log(conversations);

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus, reiciendis suscipit tempora nobis dolorum repellat quidem doloremque, enim illo quisquam aspernatur minus quo quas hic est! Minus, sint reprehenderit.`

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h2>Messages</h2>
        </div>
        {isLoading ? "Loading..." : error ? "Something went wrong." : (<table>
          <tr>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {conversations?.map((conversation) => (
            <Message conversation={conversation} />
          ))}
        </table>)}
      </div>
    </div>
  )
}

export default Messages;