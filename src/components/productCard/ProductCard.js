import React from 'react'
import './ProductCard.css'
import {HiOutlinePlusSm} from 'react-icons/hi'

const ProductCard = ({title, price, imgUrl}) => {
  return (
    <div className='card-item'>
      <img className='card-image' src={imgUrl} alt="" />
      <div className="card-body p-3">
        <h3 className="card-title">{title}</h3>
        <p className="card-text mt-1"><span className='price'>{price}</span></p>
        <button className='w-100 py-1'> <HiOutlinePlusSm className='plus-icon' /> </button>
      </div>
    </div>
  )
}

export default ProductCard