import React from "react";
import { Link } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ to, icon, label }) => {
  return (
    <li>
      <Link className="text-md-start text-center" to={to}>
        <span className="list-icon">{icon}</span>
        <span className="list-link d-md-inline-block d-none">{label}</span>
      </Link>
    </li>
  );
};

export default ListItem;
