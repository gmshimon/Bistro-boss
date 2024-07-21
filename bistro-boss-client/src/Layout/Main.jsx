/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { getMenuLists } from '../Redux/Menu/menuSlice'

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMenuLists())
  }, [dispatch])
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Main
