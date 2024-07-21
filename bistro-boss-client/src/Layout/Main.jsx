/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { getMenuLists } from '../Redux/Menu/menuSlice'

const Main = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isLoginPage = location.pathname.includes("login")
  useEffect(() => {
    dispatch(getMenuLists())
    // fetch("http://localhost:5000/api/v1/menu")
    // .then(res=>res.json())
    // .then(data=>console.log(data))
  }, [])
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
