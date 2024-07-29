/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuLists } from '../Redux/Slice/menuSlice'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '../firebase/firebase.config'
import { saveUserData, setUser, startLoading } from '../Redux/Slice/AuthSlice'
// import { setUser, toggleLoading } from '../Redux/Slice/AuthSlice'

const Main = () => {
  const {isLoading} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const isLoginPage = location.pathname.includes("login") || location.pathname.includes("register")
  useEffect(() => {
    dispatch(getMenuLists())
    onAuthStateChanged(auth,(user)=>{
      console.log("User: " + user)
      if(user){
        dispatch(saveUserData({
          name:user?.displayName,
          email:user?.email,
        }))
        // dispatch(setUser(user))
      }else{
        dispatch(startLoading(false))
        // dispatch(toggleLoading())
      }
    })
  }, [dispatch])
  return (
    <div>
      {
        isLoginPage || <Navbar></Navbar>
      }
      <Outlet></Outlet>
      {
        isLoginPage || <Footer></Footer>
      }
    </div>
  )
}

export default Main
