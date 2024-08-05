/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utilis/axios'

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
    isGetMenuError:false,
    isGetMenuSuccess:false,
    isCreateMenuLoading:false,
    isCreateMenuError:false,
    isCreateMenuSuccess:false,
}

export const getMenuLists = createAsyncThunk ("getMenuLists",async ()=>{
    const response = await axios.get('/menu')
    return response.data.data;
})

export const addMenuItem = createAsyncThunk ("addMenuItem",async (data)=>{
    const response = await axios.post('/menu',data,{
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
    return response.data;
})
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isGetMenuLoading=false,
            state.isGetMenuError=false,
            state.isGetMenuSuccess=false,
            state.isCreateMenuLoading=false,
            state.isCreateMenuError=false,
            state.isCreateMenuSuccess=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMenuLists.pending,(state,action)=>{
            state.isGetMenuLoading = true;
            state.isGetMenuSuccess = false;
            state.isGetMenuError = false;
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
            state.isGetMenuSuccess = true;
            state.isGetMenuLoading = false;
        })
        .addCase(getMenuLists.rejected,(state,action)=>{
            state.isGetMenuError = true;
            state.isGetMenuSuccess = false;
            state.isGetMenuLoading = false;
        })
        .addCase(addMenuItem.pending,(state,action)=>{
            state.isCreateMenuLoading = true;
            state.isCreateMenuSuccess = false;
            state.isCreateMenuError = false;
        })
        .addCase(addMenuItem.fulfilled,(state,action)=>{
            state.isCreateMenuSuccess = true;
            state.isCreateMenuLoading = false;
            state.isCreateMenuError = false;
        })
        .addCase(addMenuItem.rejected,(state,action)=>{
            state.isCreateMenuError = true;
            state.isCreateMenuLoading = false;
            console.log(action.error)
        })
    }
})

export const {reset} = menuSlice.actions;
export default menuSlice.reducer;