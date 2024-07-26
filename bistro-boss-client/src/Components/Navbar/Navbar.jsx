/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../Redux/Slice/AuthSlice'

const Navbar = () => {
  const {user} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
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
      {
        user?.email? <li onClick={()=>dispatch(logout())}>
        <Link>Logout</Link>
      </li> :<li>
        <Link to='/login'>Login</Link>
      </li>
      }
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
