/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utilis/axios'
import axiosSecure from "../../utilis/axiosSecure";

const initialState = {
    menu:null,
    menus:[],
    desserts:[],
    soups:[],
    salads:[],
    pizzas:[],
    offered:[],
    drinks:[],
    popular:[],
    page:0,
    ItemLimit:10,
    totalPage:0,
    isGetMenuLoading:false,
    isGetMenuError:false,
    isGetMenuSuccess:false,
    isCreateMenuLoading:false,
    isCreateMenuError:false,
    isCreateMenuSuccess:false,
    isUpdateMenuLoading:false,
    isUpdateMenuError:false,
    isUpdateMenuSuccess:false,
    isDeleteMenuLoading:false,
    isDeleteMenuError:false,
    isDeleteMenuSuccess:false,
}

export const getMenuLists = createAsyncThunk ("getMenuLists",async ({page,ItemLimit})=>{
    const response = await axios.get(`/menu`)
    return response.data;
})

export const addMenuItem = createAsyncThunk ("addMenuItem",async (data)=>{
    const response = await axiosSecure.post('/menu',data,{
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
    return response.data;
})

export const getSingleMenuItem = createAsyncThunk("getSingleMenuItem",async(id)=>{
    const response = await axios.get(`/menu/${id}`)
    return response.data.data;
})
export const updateMenuItem = createAsyncThunk('updateMenuItem',async({id,data})=>{
    const token = localStorage.getItem('access_token');
    const response = await axios.put(`/menu/edit-menu/${id}`,data,{
        headers: {
            'authorization': 'Bearer '+ token,
        }
    })
    return response.data;
})

export const deleteMenuItem = createAsyncThunk('deleteMenuItem',async(id)=>{
    const token = localStorage.getItem('access_token');
    const response = await axios.delete(`/menu/delete-menu/${id}`,{
        headers:{
            'authorization': 'Bearer '+ token,
        }
    })
    return id;
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
            state.isCreateMenuSuccess=false,
            state.isUpdateMenuLoading=false,
            state.isUpdateMenuError=false,
            state.isUpdateMenuSuccess=false,
            state.isDeleteMenuLoading=false,
            state.isDeleteMenuError=false,
            state.isDeleteMenuSuccess=false
        },
        setPage:(state,action)=>{
            state.page = action.payload;
        },
        setLimit:(state,action)=>{
            state.limit = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMenuLists.pending,(state,action)=>{
            state.isGetMenuLoading = true;
            state.isGetMenuSuccess = false;
            state.isGetMenuError = false;
        })
        .addCase(getMenuLists.fulfilled,(state,action)=>{
            state.menus = action.payload.data;
            state.totalPage = Math.ceil(action.payload.page.totalItems / state.ItemLimit)
            state.desserts = action?.payload?.data.filter(item=>item?.category === 'dessert');
            state.soups = action.payload?.data.filter(item=>item.category ==='soup');
            state.salads = action.payload?.data.filter(item=>item.category ==='salad');
            state.pizzas = action.payload?.data.filter(item=>item.category ==='pizza');
            state.offered = action.payload?.data.filter(item=>item.category ==='offered');
            state.drinks = action.payload?.data.filter(item=>item.category ==='drinks');
            state.popular = action.payload?.data.filter(item=>item.category ==='popular');
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
        .addCase(getSingleMenuItem.fulfilled,(state,action)=>{
            state.menu = action.payload
        })
        .addCase(updateMenuItem.pending,(state,action)=>{
            state.isUpdateMenuLoading = true;
            state.isUpdateMenuSuccess = false;
            state.isUpdateMenuError = false;
        })
        .addCase(updateMenuItem.fulfilled,(state,action)=>{
            state.isUpdateMenuSuccess = true;
            state.isUpdateMenuLoading = false;
            state.isUpdateMenuError = false;
        })
        .addCase(updateMenuItem.rejected,(state,action)=>{
            state.isUpdateMenuError = true;
            state.isUpdateMenuLoading = false;
            state.isUpdateMenuSuccess = false;
        })
        .addCase(deleteMenuItem.pending,(state,action)=>{
            state.isDeleteMenuLoading = true;
            state.isDeleteMenuSuccess = false;
            state.isDeleteMenuError = false;
        })
        .addCase(deleteMenuItem.fulfilled,(state,action)=>{
            state.isDeleteMenuSuccess = true;
            state.isDeleteMenuLoading = false;
            state.isDeleteMenuError = false;
            const result = state.menus.filter(menu=>menu._id !==action.payload)
            state.menus = result;
        })
    }
})

export const {reset,setPage,setLimit} = menuSlice.actions;
export default menuSlice.reducer;