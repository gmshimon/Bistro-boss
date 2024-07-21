/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    menu:[],
    desserts:[],
    soups:[],
    salads:[],
    pizzas:[],
    offered:[],
    drinks:[],
    popular:[],
    isGetMenuLoading:false,
    isGetLoadingError:false,
    isGetLoadingSuccess:false,
}

export const getMenuLists = createAsyncThunk ("getMenuLists",async ()=>{
    const response = await axios.get('http://localhost:5000/api/v1/menu')
    return response.data.data;
})

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{
        reset:(state)=>{
            state.menu = [],
            state.desserts=[];
            state.soups=[];
            state.salads=[];
            state.pizzas=[];
            state.offered=[];
            state.drinks=[];
            state.popular = [];
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
            state.desserts = action?.payload?.filter(item=>item?.category === 'dessert');
            state.soups = action.payload.filter(item=>item.category ==='soup');
            state.salads = action.payload.filter(item=>item.category ==='salad');
            state.pizzas = action.payload.filter(item=>item.category ==='pizza');
            state.offered = action.payload.filter(item=>item.category ==='offered');
            state.drinks = action.payload.filter(item=>item.category ==='drinks');
            state.popular = action.payload.filter(item=>item.category ==='popular');
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