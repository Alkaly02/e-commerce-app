import React from "react";
import { NavLink } from "react-router-dom";
import "./ListItem.css";

const ListItem = ({ to, icon, label, color, activeColor, isAdmin }) => {
  return (
    <li>
      <NavLink
      
        to={to}
        className={isAdmin ? "adminLinkHover text-md-start text-center" : "userLinkHover text-md-start text-center"}
        // className={"text-md-start text-center" + !false ? "adminLinkHover" : "userLinkHover"}
        style={({isActive}) => ({
          color: isActive ? activeColor : color
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
