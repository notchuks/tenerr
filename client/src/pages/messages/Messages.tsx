import React from 'react';
import { Link } from 'react-router-dom';
import "./Messages.scss";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "John Doe",
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptatibus, reiciendis suscipit tempora nobis dolorum repellat quidem doloremque, enim illo quisquam aspernatur minus quo quas hic est! Minus, sint reprehenderit.`

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h2>Messages</h2>
        </div>
        <table>
          <tr>
            <th>Buyer</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr className="active">
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
            <td>
              <button>Mark as Read</button>
            </td>            
          </tr>
          <tr>
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>John Doe</td>
            <td><Link to={"/message/123"} className="link">{message.substring(0, 100)}...</Link></td>
            <td>1 day ago</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Messages;