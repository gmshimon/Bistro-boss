/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utilis/axios'

const initialState = {
    cartItems:[],
    isCartCreateLoading:false,
    isCartCreateSuccess:false,
    isCartCreateError:false,
    isCartGetLoading:false,
    isCartGetSuccess:false,
    isCartGetError:false,
    // isCartUpdateLoading:false,
    // isCartUpdateSuccess:false,
    // isCartUpdateError:false,
}

export const addToCart = createAsyncThunk('addToCart', async (item) => {
    const response = await axios.post('/cart', item)
    return response.data.data
})

export const getCartItems = createAsyncThunk('getCartItems', async (email) => {
    const response = await axios.get(`/cart/?email=${email}`)
    return response.data.data
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: state => {
            state.isCartCreateLoading = false;
            state.isCartCreateSuccess = false;
            state.isCartCreateError = false;
            state.isCartGetLoading=false;
            state.isCartGetSuccess=false;
            state.isCartGetError=false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending, (state, action) => {
            state.isCartCreateLoading = true;
            state.isCartCreateSuccess = false;
            state.isCartCreateError = false;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isCartCreateSuccess = true;
            state.cartItems.push(action.payload)
            state.isCartCreateLoading = false;
            state.isCartCreateError = false;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isCartCreateError = true;
            state.isCartCreateLoading = false;
            console.log(action.error)
        })
        .addCase(getCartItems.pending, (state, action) => {
            state.isCartGetLoading = true;
            state.isCartGetSuccess = false;
            state.isCartGetError = false;
        })
        .addCase(getCartItems.fulfilled,(state, action) => {
            state.isCartGetSuccess = true;
            state.cartItems = action.payload
            state.isCartGetLoading = false;
            state.isCartGetError = false;
        })
        .addCase(getCartItems.rejected, (state, action) => {
            state.isCartGetError = true;
            state.isCartGetLoading = false;
            state.isCartCreateSuccess = false;
            console.log(action.error)
        })
    }
})

export const { reset: resetCart } = cartSlice.actions;
export default cartSlice.reducer;