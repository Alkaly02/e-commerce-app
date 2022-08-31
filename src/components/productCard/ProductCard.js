import React from 'react'
import './ProductCard.css'
import defaultImg from '../../assets/img/defaultImg.jpg'
import PropTypes from 'prop-types'

const ProductCard = ({name, prix, imgUrl, stock, children}) => {
  return (
    <div className='card-item'>
      <span>{Number(stock) !== 0 ? "Disponible" : 'Stock épuisé'}</span>
      <img style={{height: '200px'}} className='card-image' src={imgUrl ? imgUrl : defaultImg} alt="" />
      <div className="card-body p-3">
        <h3 className="card-title">{name}</h3>
        <p className="card-text mt-1"><span className='price'>${prix}</span></p>
        {children}
      </div>
    </div>
  )
}

export default ProductCard

ProductCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prix: PropTypes.string.isRequired,
  children: PropTypes.element
}