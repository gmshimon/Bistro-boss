import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosSecure from "../../utilis/axiosSecure"


const initialState = {
    booking : null,
    bookings : [],
    errorMessage: null,
    isGetBookingLoading: false,
    isGetBookingError: false,
    isGetBookingSuccess: false,
    isCreateBookingLoading: false,
    isCreateBookingSuccess: false,
    isCreateBookingError: false,
    isUpdateBookingLoading: false,
    isUpdateBookingSuccess: false,
    isUpdateBookingError: false,
    isDeleteBookingLoading: false,
    isDeleteBookingSuccess: false,
    isDeleteBookingError: false,
}

export const getBooking = createAsyncThunk('getBooking',async()=>{
    const response  = await axiosSecure.get('/booking/get-my-booking')
    return response.data.data
})

export const createBooking = createAsyncThunk('createBooking',async(data,{rejectWithValue})=>{
    try {
        const response = await axiosSecure.post('booking/make-booking',data)
        return response.data.data
    } catch (error) {
       return rejectWithValue(error.response?.data?.message || "Something went wrong") 
    }
})

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        reset: state => {
            state.errorMessage = null
            state.isGetBookingLoading = false
            state.isGetBookingError = false
            state.isGetBookingSuccess = false
            state.isCreateBookingLoading = false
            state.isCreateBookingSuccess = false
            state.isCreateBookingError = false
            state.isUpdateBookingLoading = false
            state.isUpdateBookingSuccess = false
            state.isUpdateBookingError = false
            state.isDeleteBookingLoading = false
            state.isDeleteBookingSuccess = false
            state.isDeleteBookingError = false
        },
    },
    extraReducers: builder => {
        builder
           .addCase(getBooking.pending, (state) => {
                state.isGetBookingLoading = true
                state.isGetBookingError = false
                state.isGetBookingSuccess = false
            })
           .addCase(getBooking.fulfilled, (state, action) => {
                state.isGetBookingLoading = false
                state.isGetBookingError = false
                state.isGetBookingSuccess = true
                state.bookings = action.payload
            })
           .addCase(getBooking.rejected, (state, action) => {
                state.isGetBookingLoading = false
                state.isGetBookingError = true
                state.isGetBookingSuccess = false
                console.log(action.error)
            })
            .addCase(createBooking.pending, (state) => {
                state.isCreateBookingLoading = true
                state.isCreateBookingError = false
                state.isCreateBookingSuccess = false
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.isCreateBookingLoading = false
                state.isCreateBookingError = false
                state.isCreateBookingSuccess = true
                state.booking = action.payload
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.isCreateBookingLoading = false
                state.isCreateBookingError = true
                state.isCreateBookingSuccess = false
                state.errorMessage = action.payload
            })
    }
})

export const {reset:bookingReset} = bookingSlice.actions

export default bookingSlice.reducer;