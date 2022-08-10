import React from "react";
import "./Card.css";

const Card = ({ title, number, icon }) => {
  return (
    <div className="card-info mb-3 mb-sm-0 w-100">
      <div className="icon-container">
        {icon}
      </div>
      <div className="card-stats">
        <p>{number}</p>
        <h3 className="card-title">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
