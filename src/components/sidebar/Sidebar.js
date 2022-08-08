import React from "react";
import ListItem from "../listItem/ListItem";
import "./Sidebar.css";
import PropTypes from 'prop-types'

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

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
}
