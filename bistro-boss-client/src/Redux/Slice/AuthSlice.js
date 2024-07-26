/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
  user: null,
  isLoading:true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false
}

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response.user
  }
)

export const createUser = createAsyncThunk('createUser', async ( {name,email, password} ) => {
    console.log(email,password)
    const response = await createUserWithEmailAndPassword(auth,email, password)
    const result = updateProfile(auth.currentUser,{
        displayName:name
    })
    return response.user
})
export const logOut = createAsyncThunk('logOut', async (  ) => {
    const response = await signOut(auth)
    return response
})

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
        state.isLoginLoading = false,
        state.isLoginError = false,
        state.isLoginSuccess = false,
        state.isCreateUserLoading= false;
        state.isCreateUserError= false;
        state.isCreateUserSuccess= false;
    },
    startLoading:(state,action)=>{
        state.isLoading = action.payload
    },
    setUser: (state, action) => {
        state.isLoading = false
      state.user = action.payload
    },
    logout: async (state, action) => {
      signOut(auth).then(() => {
        state.user = null
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        console.log(action.error)
        state.isLoginSuccess = false
      })
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        console.log(action.payload)
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log(action.error)
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null
        console.log('User logged out')
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log(action.error)
      })
  }
})

export const { reset, setUser,logout,startLoading } = AuthSlice.actions
export default AuthSlice.reducer
