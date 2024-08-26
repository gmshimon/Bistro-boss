import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import menuSlice from './Slice/menuSlice';
import reviewSlice from './Slice/ReviewSlice';
import authSlice from './Slice/AuthSlice';
import cartSlice from './Slice/CartSlice';
import OrderSlice from './Slice/OrderSlice'

// Persist configuration for cart slice
const cartPersistConfig = {
    key: 'cart',
    storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const store = configureStore({
    reducer: {
        menu: menuSlice,
        review: reviewSlice,
        auth: authSlice,
        order:OrderSlice,
        cart: persistedCartReducer, // Use the persisted cart reducer
    },
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
