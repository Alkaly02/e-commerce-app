import React from 'react'
import './ProductCard.css'
import {HiOutlinePlusSm} from 'react-icons/hi'
import defaultImg from '../../assets/img/defaultImg.jpg'

const ProductCard = ({name, prix, imgUrl}) => {
  return (
    <div className='card-item'>
      <img style={{height: '200px'}} className='card-image' src={imgUrl ? imgUrl : defaultImg} alt="" />
      <div className="card-body p-3">
        <h3 className="card-title">{name}</h3>
        <p className="card-text mt-1"><span className='price'>${prix}</span></p>
        <button className='w-100 py-1'> <HiOutlinePlusSm className='plus-icon' /> </button>
      </div>
    </div>
  )
}

export default ProductCard