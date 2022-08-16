import React from 'react'
import MyModal from '../modal/Modal'
import Login from '../authentication/Login'

const LoginModal = () => {
  return (
    <MyModal>
      <Login title="Veuillez vous connecter pour ajouter des produits dans votre panier" />
    </MyModal>
  )
}

export default LoginModal