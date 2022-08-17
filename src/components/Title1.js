import React from "react";

const Title1 = ({ children }) => {
  return (
    <h1 style={{ fontWeight: "700" }} className="text-left mb-4 home-title">
      {children}
    </h1>
  );
};

export default Title1;
