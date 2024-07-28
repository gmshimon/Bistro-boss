/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut, logout } from '../../Redux/Slice/AuthSlice'
import { BsCart3 } from "react-icons/bs";
import { getCartItems } from '../../Redux/Slice/CartSlice';


const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCartItems(user?.email))
  },[dispatch, user?.email])
  const navOptions = (
    <>
      <li>
        <Link to='/menu'>Menu</Link>
      </li>
      <li>
        <Link to='/order/Salad'>Order</Link>
      </li>
      <li>
        <Link to='/secret'>Secret</Link>
      </li>
      <li>
        <Link to='/dashboard/cart'>
          {/* <button className='btn'> */}
          <BsCart3 />
            <div className='badge badge-secondary'>+{cartItems?.length}</div>
          {/* </button> */}
        </Link>
      </li>
      {user?.email ? (
        <li onClick={() => dispatch(logOut())}>
          <Link>Logout</Link>
        </li>
      ) : (
        <li>
          <Link to='/login'>Login</Link>
        </li>
      )}
    </>
  )
  return (
    <>
      <div className='navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
          </div>
          <a className='btn btn-ghost text-xl'>
            <Link to='/'>BISTRO BOSS</Link>
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navOptions}</ul>
        </div>
        <div className='navbar-end'>
          <a className='btn'>Button</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
