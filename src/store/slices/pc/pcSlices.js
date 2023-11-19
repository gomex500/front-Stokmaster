import { createSlice } from '@reduxjs/toolkit';

export const pcSlice = createSlice({
    name: 'pc',
    initialState: {
        pc: [{}],
        isLoading: false,
    },
    reducers:{
        startLoadigPc: (state) =>{
            state.isLoading = true;
        },
        getPc: (state, action) =>{
            state.pc = action.payload.pc;
            state.isLoading = action.payload.isLoading;
        },
    },
});

export const { startLoadigPc, getPc } = pcSlice.actions;