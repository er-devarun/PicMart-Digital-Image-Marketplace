import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice';
import navSlice from './slices/navSlice';
import postSlice from './slices/postSlice';
import orderSlice from './slices/orderSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        nav: navSlice,
        post: postSlice,
        order: orderSlice,
    }
});

export default store;