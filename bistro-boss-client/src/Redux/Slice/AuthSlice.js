/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import auth from '../../firebase/firebase.config'
import axios from '../../utilis/axios'

const initialState = {
  user: null,
  users:[],
  isLoading:true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,
  isLoginWithGoogleLoading: false,
  isLoginWithGoogleSuccess: false,
  isLoginWithGoogleError: false,
  isSaveUserDataLoading: false,
  isSaveUserDataSuccess: false,
  isSaveUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
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

export const loginWithGoogle = createAsyncThunk('loginWithGoogle',async()=>{
  const provider = new GoogleAuthProvider()
  const response = await signInWithPopup(auth, provider)
  return response.user
})

export const saveUserData = createAsyncThunk('saveUserData', async(userData)=>{
  const response = await axios.post('/user',userData)
  return response.data.data
})

export const getAllUsers = createAsyncThunk('getAllUsers', async()=>{
  const response = await axios.get('/user')
  return response.data.data
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
        state.isLoginWithGoogleLoading=false;
        state.isLoginWithGoogleSuccess=false;
        state.isLoginWithGoogleError=false;
        state.isSaveUserDataLoading=false;
        state.isSaveUserDataSuccess=false;
        state.isSaveUserDataError=false;
        state.isGetUsersLoading=false;
        state.isGetUsersSuccess=false;
        state.isGetUsersError=false;
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
        state.user = action.payload.email
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
        state.user = action.payload.email
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
      .addCase(loginWithGoogle.pending, state => {
        state.isLoginWithGoogleLoading = true
        state.isLoginWithGoogleError = false
        state.isLoginWithGoogleSuccess = false
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.email
        state.isLoginWithGoogleLoading = false
        state.isLoginWithGoogleSuccess = true
        state.isLoginWithGoogleError = false
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoginWithGoogleLoading = false
        state.isLoginWithGoogleError = true
        console.log(action.error)
        state.isLoginWithGoogleSuccess = false
      })
      .addCase(saveUserData.pending,(state, action) =>{
        state.isSaveUserDataLoading = true;
        state.isSaveUserDataSuccess = false;
        state.isSaveUserDataError = false;
      })
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.isSaveUserDataSuccess = true;
        state.isSaveUserDataLoading = false;
        state.isSaveUserDataError = false;
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(saveUserData.rejected, (state,action) => {
        state.isSaveUserDataSuccess = false;
        state.isSaveUserDataLoading = false;
        state.isSaveUserDataError = true;
        state.isLoading = false
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.isGetUsersLoading = true
        state.isGetUsersSuccess = false
        state.isGetUsersError = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isGetUsersLoading = false
        state.isGetUsersSuccess = true
        state.isGetUsersError = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isGetUsersLoading = false
        state.isGetUsersSuccess = false
        state.isGetUsersError = true
      })
  }
})

export const { reset, setUser,logout,startLoading } = AuthSlice.actions
export default AuthSlice.reducer
