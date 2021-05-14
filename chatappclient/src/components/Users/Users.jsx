import React from "react";
import "./Users.css";
const Users = ({ user }) => {
  console.log(user);
  return (
    <div className="usersWrapper">
      <div className="greenDot"></div>
      <span>{user.userName}</span>
    </div>
  );
};

export default Users;
