import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { format } from "timeago.js";
import { HighlightOff } from "@material-ui/icons";
import axios from "axios";
import "./message.css";
const Message = ({ message }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteMessage = async () => {
    setIsDeleted((prev) => !prev);
    try {
      await axios.put(
        `https://chat-app-mernn.herokuapp.com/api/message/delete/${message.content}`,
        { isDeleted: true }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const { user } = useContext(Context);
  let body;
  if (user.username === message.senderName) {
    body = (
      <div className="MyMessage">
        <div className="desc">
          <span className="name">{user.username}</span>
          <span className="time">{format(message.createdAt)}</span>
        </div>
        <div className="messageBox">
          <span className={isDeleted || message.isDeleted ? "delete" : "span"}>
            {isDeleted || message.isDeleted
              ? "Wiadomość usunięta..."
              : message.content}
          </span>
        </div>
        {isDeleted || message.isDeleted ? null : (
          <HighlightOff className="x" onClick={deleteMessage} />
        )}
      </div>
    );
  } else {
    body = (
      <div className="OtherMessage">
        <div className="messageBox">
          <span>{message.content}</span>
        </div>
        <div className="desc">
          <span className="name">{message.senderName}</span>
          <span className="time">{format(message.createdAt)}</span>
        </div>
      </div>
    );
  }

  return body;
};

export default Message;
