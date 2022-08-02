import React from 'react'
import ProductCard from '../productCard/ProductCard'
import './ProductsContainer.css'
import chair from '../../assets/img/chair.jpg'

const ProductsContainer = ({title, description}) => {
  return (
    <section className='px-5'>
        <h2 className='section__h2 m-0'>{title}</h2>
        <p className='m-0 section__p mt-1'>{description}</p>
        <div className="products mt-4">
            <ProductCard title="Couple Sofa" price="$135.78" imgUrl={chair} />
        </div>
    </section>
  )
}

export default ProductsContainer