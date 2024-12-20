import React from "react";
import avatar from "../../../assets/avatar.svg";
import "./sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">User Name Goes Here</p>
      </div>
    </div>
  );
}

export default SideBar;
