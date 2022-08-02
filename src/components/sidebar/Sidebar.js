import { linkWithCredential } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import ListItem from "../listItem/ListItem";
import "./Sidebar.css";

const Sidebar = ({ title, links }) => {
  return (
    <nav className="sidebar p-4  d-none d-md-block">
      <h3 className="sidebar-title">{title}</h3>
      <div className="line">
        <div className="child"></div>
      </div>
      <ul className="p-0 mt-4">
        {
          links?.map((link, index) => (
            <ListItem key={index} {...link} />
          ))
        }
      </ul>
    </nav>
  );
};

export default Sidebar;
