import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import commandeSlice from './slices/commandeSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice,
        command: commandeSlice
    }
})

export default store