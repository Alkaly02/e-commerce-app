import React from 'react'
import MyModal from '../modal/Modal'
import Login from '../authentication/Login'

const LoginModal = ({title}) => {
  return (
    <MyModal>
      <Login title={title} />
    </MyModal>
  )
}

export default LoginModal