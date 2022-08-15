import React from "react";
import CartInput from "./CartInput";
import './cartForm.css'

const CartForm = () => {
  return (
    <form>
      <CartInput label='Nom sur la carte' placeholder='Alkaly BADJI' type='text' />
      <CartInput label='Numero de la carte' placeholder='Numero de la carte' type='number' />
      <div className="d-flex">
        <CartInput label="Date d'expiration" placeholder='15/08/2022' type='date' width='98' />
        <CartInput label='CVV' placeholder='123' type='number' width='98' />
      </div>
    </form>
  );
};

export default CartForm;
