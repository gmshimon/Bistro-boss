import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './Slice/menuSlice';
import reviewSlice from './Slice/ReviewSlice'
import authSlice from './Slice/AuthSlice';

const store = configureStore  ({
    reducer:{
        menu:menuSlice,
        review:reviewSlice,
        auth:authSlice
    }
})

export default store;