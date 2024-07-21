import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './Menu/menuSlice';
import reviewSlice from './Review/ReviewSlice'
const store = configureStore  ({
    reducer:{
        menu:menuSlice,
        review:reviewSlice
    }
})

export default store;