import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './Menu/menuSlice';

const store = configureStore  ({
    reducer:{
        menu:menuSlice
    }
})

export default store;