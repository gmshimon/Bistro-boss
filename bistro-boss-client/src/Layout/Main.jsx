/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import CurrentUser from '../utilis/CurrentUser'
// import { setUser, toggleLoading } from '../Redux/Slice/AuthSlice'

const Main = () => {
  const {isLoading} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const isLoginPage = location.pathname.includes("login") || location.pathname.includes("register")
  CurrentUser()
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
