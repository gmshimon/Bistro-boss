/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithCredential, signOut } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
  user: null,
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
    const response = await signInWithCredential(auth, email, password)
    return response.user
  }
)

export const createUser = createAsyncThunk('createUser', async ({ email, password }) => {
    const response = await createUserWithEmailAndPassword(auth,email, password)
    return response.user
  
})

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      (state.isLoginLoading = false),
        (state.isLoginError = false),
        (state.isLoginSuccess = false),
        state.isCreateUserLoading= false;
        state.isCreateUserError= false;
        state.isCreateUserSuccess= false;
    },
    setUser: (state, action) => {
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
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
  }
})

export const { reset, setUser,logout } = AuthSlice.actions
export default AuthSlice.reducer
