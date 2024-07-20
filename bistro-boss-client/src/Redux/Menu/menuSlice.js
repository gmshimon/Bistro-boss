/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu:[],
    isGetMenuLoading:false,
    isGetLoadingError:false,
    isGetLoadingSuccess:false,
}

export const getMenuLists = createAsyncThunk ("getMenuLists",async ()=>{
    const result = await fetch('menu.json')
    const data = result.json();
    return data;
})

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{
        reset:(state)=>{
            state.menu = [],
            state.isGetMenuLoading=false,
            state.isGetLoadingError=false,
            state.isGetLoadingSuccess=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMenuLists.pending,(state,action)=>{
            state.isGetMenuLoading = true;
            state.isGetLoadingSuccess = false;
            state.isGetLoadingError = false;
        })
        .addCase(getMenuLists.fulfilled,(state,action)=>{
            state.menu = action.payload;
            state.isGetMenuLoading = false;
            state.isGetLoadingSuccess = true;
            state.isGetMenuLoading = false;
        })
        .addCase(getMenuLists.rejected,(state,action)=>{
            state.isGetLoadingError = true;
            state.isGetLoadingSuccess = false;
            state.isGetMenuLoading = false;
        })
    }
})

export const {reset} = menuSlice.actions;
export default menuSlice.reducer;