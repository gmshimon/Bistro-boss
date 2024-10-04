/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
import axios from '../../utilis/axios'

const initialState = {
  reviews: [],
  isGetReviewLoading: false,
  isGetReviewError: false,
  isGetReviewSuccess: false,
  isCreateReviewLoading: false,
  isCreateReviewError: false,
  isCreateReviewSuccess: false
}

export const getReview = createAsyncThunk('getReview', async () => {
  const response = await axios.get('/review')
  return response.data.data
})

export const createReview = createAsyncThunk('createReview', async (reviewData) => {
  const response = await axiosSecure.post('/review/create-review', reviewData)
  return response.data.data
})

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    reset: state => {
      (state.reviews = []),
        (state.isGetReviewLoading = false),
        (state.isGetReviewError = false),
        (state.isGetReviewSuccess = false),
        state.isCreateReviewLoading=false,
        state.isCreateReviewError=false,
        state.isCreateReviewSuccess= false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getReview.pending, (state, action) => {
        state.isGetReviewLoading = true
        state.isGetReviewSuccess = false
        state.isGetReviewError = false
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.reviews = action.payload
        state.isGetReviewLoading = false
        state.isGetReviewSuccess = true
        state.isGetReviewError = false
      })
      .addCase(getReview.rejected, (state, action) => {
        state.isGetReviewLoading = false
        state.isGetReviewSuccess = false
        state.isGetReviewError = true
      })
      .addCase(createReview.pending, (state, action) => {
        state.isCreateReviewLoading = true
        state.isCreateReviewSuccess = false
        state.isCreateReviewError = false
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isCreateReviewSuccess = true
        state.isCreateReviewLoading = false
        state.reviews.push(action.payload)
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isCreateReviewLoading = false
        state.isCreateReviewSuccess = false
        state.isCreateReviewError = true
      })
  }
})

export const {reset} = reviewSlice.actions;
export default reviewSlice.reducer;


