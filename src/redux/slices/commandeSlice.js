import { createSlice } from "@reduxjs/toolkit";

const commandSliece = createSlice({
    name: 'command',
    initialState: {fromCommand: false},
    reducers: {
        isCommand: (state) => {
            state.fromCommand = true
        },
        makeCommandFalse: (state) => {
            state.fromCommand = false
        }
    }
})

export const {isCommand, makeCommandFalse} = commandSliece.actions;
export default commandSliece.reducer