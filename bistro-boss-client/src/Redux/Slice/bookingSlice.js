import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosSecure from "../../utilis/axiosSecure"


const initialState = {
    booking : null,
    bookings : [],
    errorMessage: null,
    isGetBookingLoading: false,
    isGetBookingError: false,
    isGetBookingSuccess: false,
    isGetMyBookingLoading: false,
    isGetMyBookingError: false,
    isGetMyBookingSuccess: false,
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

export const createBooking = createAsyncThunk('createBooking',async(data,{rejectWithValue})=>{
    try {
        const response = await axiosSecure.post('booking/make-booking',data)
        return response.data.data
    } catch (error) {
       return rejectWithValue(error.response?.data?.message || "Something went wrong") 
    }
})

export const getMyBooking = createAsyncThunk('getMyBooking',async()=>{
    const response  = await axiosSecure.get('/booking/my-booking')
    return response.data.data
})

export const getAllBooking = createAsyncThunk('getAllBooking',async()=>{
    const response  = await axiosSecure.get('/booking/all-bookings')
    return response.data.data
})

export const cancelMyBooking = createAsyncThunk('cancelMyBooking',async(id)=>{  
    const response = await axiosSecure.delete(`/booking/cancel-my-booking/${id}`)
    return id
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
            state.isGetMyBookingLoading=false
            state.isGetMyBookingError=false
            state.isGetMyBookingSuccess=false
        },
    },
    extraReducers: builder => {
        builder
           .addCase(getAllBooking.pending, (state) => {
                state.isGetBookingLoading = true
                state.isGetBookingError = false
                state.isGetBookingSuccess = false
            })
           .addCase(getAllBooking.fulfilled, (state, action) => {
                state.isGetBookingLoading = false
                state.isGetBookingError = false
                state.isGetBookingSuccess = true
                state.bookings = action.payload
            })
           .addCase(getAllBooking.rejected, (state, action) => {
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
            .addCase(getMyBooking.pending, (state) => {
                state.isGetMyBookingLoading = true
                state.isGetMyBookingError = false
                state.isGetMyBookingSuccess = false
            })
            .addCase(getMyBooking.fulfilled, (state, action) => {
                state.isGetMyBookingLoading = false
                state.isGetMyBookingError = false
                state.isGetMyBookingSuccess = true
                state.bookings = action.payload
            })
            .addCase(getMyBooking.rejected, (state, action) => {
                state.isGetMyBookingLoading = false
                state.isGetMyBookingError = true
                state.isGetMyBookingSuccess = false
                console.log(action.error)
            })
            .addCase(cancelMyBooking.pending, (state) => {
                state.isDeleteBookingLoading = true
                state.isDeleteBookingError = false
                state.isDeleteBookingSuccess = false
            })
            .addCase(cancelMyBooking.fulfilled, (state,action) => {
                state.isDeleteBookingLoading = false
                state.isDeleteBookingSuccess = true
                state.isDeleteBookingError = false
                const result = state.bookings.filter (item=>item._id !== action.payload)
                state.bookings = result
            })
            .addCase(cancelMyBooking.rejected, (state) => {
                state.isDeleteBookingLoading = false
                state.isDeleteBookingSuccess = false
                state.isDeleteBookingError = true
            })
    }
})

export const {reset:bookingReset} = bookingSlice.actions

export default bookingSlice.reducer;