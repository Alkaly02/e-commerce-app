import React from 'react'
import { HiOutlinePlusSm } from 'react-icons/hi'

const AddBtn = ({onClick}) => {
  return (
    <button
        style={{ fontWeight: "700" }}
        onClick={onClick}
        className="btn add-btn"
      >
        {" "}
        <HiOutlinePlusSm size={35} />
      </button>
  )
}

export default AddBtn