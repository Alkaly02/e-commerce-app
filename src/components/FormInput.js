import React from "react";
import PropTypes from 'prop-types'

const FormInput = ({refInput, type, id, placeholder}) => {
  return (
    <input
      ref={refInput}
      type={type}
      className="form__input"
      id={id}
      placeholder={placeholder}
    />
  );
};

export default FormInput;

FormInput.prototypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string
}