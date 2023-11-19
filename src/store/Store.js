import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/user/userSlice';
import { pcSlice } from './slices/pc/pcSlices';
import { usersSlice } from './slices/users/usersSlices'

export const Store = configureStore({
    reducer:{
        user: userSlice.reducer,
        pc: pcSlice.reducer,
        users: usersSlice.reducer
    },
});