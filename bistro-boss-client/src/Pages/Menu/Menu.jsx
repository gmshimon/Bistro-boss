/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Cover from '../../Components/Cover/Cover'
import banner from '../../assets/menu/banner3.jpg'
import PopularMenu from '../../Components/PopularMenu/PopularMenu'
import { useSelector, useDispatch } from 'react-redux'
import { getMenuLists } from '../../Redux/Menu/menuSlice'

const Menu = () => {
    const {menu} = useSelector(state=>state.menu)
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(getMenuLists())
    // },[dispatch])
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={banner} title={"Our Menu"} subtitle={"Would you like to try a dish?"}/>
      <PopularMenu/>
      <Cover img={banner}/>
      <PopularMenu/>
      <Cover img={banner}/>
      <PopularMenu/>
    </div>
  )
}

export default Menu
