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
    isCartDeleteLoading:false,
    isCartDeleteSuccess:false,
    isCartDeleteError:false,
}

export const addToCart = createAsyncThunk('addToCart', async (item) => {
    const response = await axios.post('/cart', item)
    return response.data.data
})

export const getCartItems = createAsyncThunk('getCartItems', async (email) => {
    const response = await axios.get(`/cart/?email=${email}`)
    return response.data.data
})

export const deleteCartItems = createAsyncThunk('deleteCartItems',async(itemId) => {
    const response = await axios.delete(`/cart/?itemId=${itemId}`)
    return [response.data.data,itemId]
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
            state.isCartDeleteLoading=false;
            state.isCartDeleteSuccess=false;
            state.isCartDeleteError=false;
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
        .addCase(deleteCartItems.pending, (state, action) => {
            state.isCartDeleteLoading = true;
            state.isCartDeleteSuccess = false;
            state.isCartDeleteError = false;
        })
        .addCase(deleteCartItems.fulfilled,(state, action) => {
            state.isCartDeleteSuccess = true;
            state.cartItems = state.cartItems.filter(item=>item._id!== action.payload[1])
            state.isCartDeleteLoading = false;
            state.isCartDeleteError = false;
        })
        .addCase(deleteCartItems.rejected,(state,action)=>{
            state.isCartDeleteError = true;
            state.isCartDeleteLoading = false;
            state.isCartDeleteSuccess = false;
            console.log(action.error)
        })
    }
})

export const { reset: resetCart } = cartSlice.actions;
export default cartSlice.reducer;