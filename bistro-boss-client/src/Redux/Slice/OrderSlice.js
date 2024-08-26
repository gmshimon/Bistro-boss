/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'

const initialState = {
    orders:[],
    getMyOrderLoading: false,
    getMyOrderError: false,
    getMyOrderSuccess: false,
}

export const getMyOrder = createAsyncThunk('getMyOrder',async()=>{
    const response  = await axiosSecure.get('/order/get-my-order')
    return response.data.data
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset:state=>{
            state.getMyOrderLoading=false;
            state.getMyOrderError=false;
            state.getMyOrderSuccess=false;
        }
    },
    extraReducers: builder=>{
        builder
        .addCase(getMyOrder.pending,(state)=>{
            state.getMyOrderLoading = true
            state.getMyOrderError = false
            state.getMyOrderSuccess = false
        })
        .addCase(getMyOrder.fulfilled,(state,action)=>{
            state.orders = action.payload
            state.getMyOrderLoading = false
            state.getMyOrderError = false
            state.getMyOrderSuccess = true
        })
        .addCase(getMyOrder.rejected,(state,action)=>{
            state.getMyOrderLoading = false
            state.getMyOrderError = true
            state.getMyOrderSuccess = false
        })
    }
})

export const {
    reset: resetOrder,
  } = orderSlice.actions
  export default orderSlice.reducer
  