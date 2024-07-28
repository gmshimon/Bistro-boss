import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './Slice/menuSlice';
import reviewSlice from './Slice/ReviewSlice'
import authSlice from './Slice/AuthSlice'
import cartSlice from './Slice/CartSlice'

const store = configureStore  ({
    reducer:{
        menu:menuSlice,
        review:reviewSlice,
        auth:authSlice,
        cart:cartSlice
    }
})

export default store;