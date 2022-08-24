import { createSlice } from "@reduxjs/toolkit";

const globalShopSlice = createSlice({
    name: 'globalShop',
    initialState: [],
    reducers: {
        setGlogalShop: (state, {payload}) => {
            state.length = 0
            state.push(payload)
            return state
        },
        deleteGlobalShop: (state) => {
            state.length = 0
            return state
        }
    }
})

export const {setGlogalShop, deleteGlobalShop} = globalShopSlice.actions

export default globalShopSlice.reducer