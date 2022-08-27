import { createSlice } from '@reduxjs/toolkit';
const globalCartSlice = createSlice({
    name: 'globalCart',
    initialState: [],
    reducers: {
        addToGlobalCart: (state, {payload}) => {
            state = [...payload]
            return state
        },
        resetGlobalCart: ((state, {payload}) => {
            state.length = 0
            return state
        })
    }
})

export const {addToGlobalCart, resetGlobalCart} = globalCartSlice.actions
export default globalCartSlice.reducer
