import React from "react";

const ShopCard = ({ shopName, icon }) => {
  return (
    <div
      style={{
        minHeight: "90px",
        backgroundColor: "#2b3445",
        backgroundImage:
          "linear-gradient(160deg, #2b3445 0%, #2b3445 46%, #2b3445 66%, #2b3445 100%)",
      }}
      className="card-info mb-3 mb-sm-0 w-100"
    >
      <div style={{ marginTop: "-10px" }} className="icon-container">
        {icon}
      </div>
      <div className="card-stats">
        <h4 className="fs-6 m-0">{shopName}</h4>
      </div>
    </div>
  );
};

export default ShopCard;
