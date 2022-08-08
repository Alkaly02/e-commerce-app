import React from 'react'
import usePanier from '../../hooks/usePanier'
import useProducts from '../../hooks/useProducts'

const Panier = () => {
    const {panier} = usePanier()
    const {products} = useProducts()
  return (
    <div className='vh-100 vw-100' style={{position: 'fixed', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
        <div style={{width: '25%', position: 'absolute', right: '0', backgroundColor: 'white'}} className='panier vh-100'>
            panier
        </div>
    </div>
  )
}

export default Panier