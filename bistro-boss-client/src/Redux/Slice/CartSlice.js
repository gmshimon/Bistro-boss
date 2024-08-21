/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utilis/axios'

const initialState = {
  cartItems: [],
  isCartCreateLoading: false,
  isCartCreateSuccess: false,
  isCartCreateError: false,
  isCartGetLoading: false,
  isCartGetSuccess: false,
  isCartGetError: false,
  // isCartUpdateLoading:false,
  // isCartUpdateSuccess:false,
  // isCartUpdateError:false,
  isCartDeleteLoading: false,
  isCartDeleteSuccess: false,
  isCartDeleteError: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: state => {
      state.isCartCreateLoading = false
      state.isCartCreateSuccess = false
      state.isCartCreateError = false
      state.isCartGetLoading = false
      state.isCartGetSuccess = false
      state.isCartGetError = false
      state.isCartDeleteLoading = false
      state.isCartDeleteSuccess = false
      state.isCartDeleteError = false
    },
    setCartNull:state=>{
      state.cartItems = []
    },
    addCartItems: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.menuID === action.payload.menuID
      )
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.quantity * action.payload.price
        // existingItem.totalDiscount = existingItem.quantity * action.payload.discount
      } else {
        state.cartItems.push({
          ...action.payload,
          totalPrice: action.payload.price * 1,
          quantity: 1
        })
      }
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.menuID === action.payload.menuID
      )

      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.quantity * action.payload.price
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.menuID === action.payload.menuID
      )

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
          existingItem.totalPrice =
            existingItem.totalPrice - action.payload.price
        } else {
          // Optionally remove the item if quantity becomes zero
          state.cartItems = state.cartItems.filter(
            item => item.menuID !== action.payload.menuID
          )
        }
      }
    }
  },
  extraReducers: builder => {
    builder
  }
})

export const {
  reset: resetCart,
  addCartItems,
  incrementQuantity,
  decrementQuantity,
  setCartNull
} = cartSlice.actions
export default cartSlice.reducer
