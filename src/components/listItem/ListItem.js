import React from "react";
import { NavLink } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className="text-md-start text-center"
        style={({isActive}) => ({
          color: isActive ? "rgb(75, 180, 180)" : "#2B3445"
        })}
        end
      >
        <span className="list-icon">{icon}</span>
        <span className="list-link d-md-inline-block d-none">{label}</span>
      </NavLink>
    </li>
  );
};

export default ListItem;
