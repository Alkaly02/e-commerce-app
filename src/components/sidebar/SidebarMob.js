import React from "react";
import ListItem from "../listItem/ListItem";
import "./Sidebar.css";
import PropTypes from 'prop-types'

const SidebarMob = ({ links, bgColor, color, activeColor, isAdmin }) => {
  return (
    <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.5) !important'
    }} className="p-0 shadow d-md-none d-block">
      <ul className="p-0 mt-4 d-flex justify-content-between">
        {
          links?.map((link, index) => (
            <ListItem isAdmin={isAdmin} activeColor={activeColor} color={color} key={index} {...link} />
          ))
        }
      </ul>
    </nav>
  );
};

export default SidebarMob;

SidebarMob.prototypes = {
    links: PropTypes.array.isRequired
}