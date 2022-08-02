import React from "react";
import { Link } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ to, icon, label }) => {
  return (
    <li>
      <Link to={to}>
        <span className="list-icon">{icon}</span>
        <span className="list-link">{label}</span>
      </Link>
    </li>
  );
};

export default ListItem;
