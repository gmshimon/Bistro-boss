/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  reviews: [],
  isGetReviewLoading: false,
  isGetReviewError: false,
  isGetReviewSuccess: false
}

export const getReview = createAsyncThunk('getReview', async () => {
  const response = await axios.get('http://localhost:5000/api/v1/review')
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
        (state.isGetReviewSuccess = false)
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
  }
})

export const {reset} = reviewSlice.actions;
export default reviewSlice.reducer;


