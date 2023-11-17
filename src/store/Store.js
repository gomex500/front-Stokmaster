import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { pcSlice } from './slices/pcSlices';

export const Store = configureStore({
    reducer:{
        user: userSlice.reducer,
        pc: pcSlice.reducer
    },
});