import React from "react";

import "./Room.css";
const Rooms = ({ room, dispatch }) => {
  const handleClick = () => {
    window.sessionStorage.setItem("room", room.roomName);
    dispatch({ type: "JOIN_ROOM", payload: room.roomName });
  };
  return (
    <div className="room" onClick={handleClick}>
      <img
        src="https://609d6241cada021bf63ee30b--chat-app-mernn.netlify.app/images/room.jpg"
        alt=""
      />
      <div>
        <span className="name">{room.roomName}</span>
        <span className="desc">{room.desc}</span>
      </div>
    </div>
  );
};

export default Rooms;
