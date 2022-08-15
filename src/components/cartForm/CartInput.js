import React from "react";
import PropTypes from 'prop-types'

const CartInput = ({ placeholder, type, value, name, onChange, label, width }) => {
  return (
    <div className="mb-3">
      <label className="cart--label" htmlFor="">{label}</label>
      <input
        style={{width: `${width}%`, color: 'white'}}
        className="cart--input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CartInput;

CartInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired
}
