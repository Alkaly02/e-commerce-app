import React from 'react'
import './ProductsContainer.css'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

const ProductsContainer = ({title, description, loading, children}) => {
  const {currentUser} = useAuth()
  return (
    <section style={{paddingBottom: '30rem'}} className='px-sm-5 px-3 pt-3'>
      {
        currentUser?.email
      }
        <h2 className='section__h2 m-0'>{ !loading ? title : ''}</h2>
        <p className='m-0 section__p mt-1'>{description}</p>
        <div className="products mt-4">
            {children}
        </div>
    </section>
  )
}

export default ProductsContainer

ProductsContainer.prototypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  loading: PropTypes.bool
}
