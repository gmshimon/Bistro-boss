/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logOut } from '../../Redux/Slice/AuthSlice'
import {
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaRegCalendarCheck,
  FaShoppingCart,
  FaUsers,
  FaUtensils
} from 'react-icons/fa'
import {
  MdOutlineMenu,
  MdOutlinePayment,
  MdOutlineRateReview
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const DashboardNavbar = () => {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const navOptions =
    user?.role === 'admin' ? (
      <>
        <li>
          <NavLink to='/dashboard/admin-home'>
            <FaHome />
            Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/admin-add-items'>
            <FaUtensils />
            Add Items
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/admin-manage-items'>
            <FaList />
            Manage Items
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/admin-manage-bookings'>
            <FaBook />
            Manage Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/all-user'>
            <FaUsers />
            All Users
          </NavLink>
        </li>
      </>
    ) : (
      <>
        <li>
          <NavLink to='/dashboard/user-home'>
            <FaHome />
            User Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/reservation'>
            <FaCalendar />
            Reservation
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/cart'>
            <FaShoppingCart />
            My Cart ({cartItems.length})
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/payment-history'>
            <MdOutlinePayment />
            Payment History
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/add-review'>
            <MdOutlineRateReview />
            Add Review
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/my-booking'>
            <FaList />
            My Bookings
          </NavLink>
        </li>
      </>
    )
  return (
    <>
      <div className=' navbar max-w-screen-xl fixed z-10 bg-opacity-30 bg-black text-white'>
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
            <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
            {navOptions}
        </ul>
          </div>
          <a className='btn btn-ghost text-xl'>
            <Link to='/'>BISTRO BOSS</Link>
          </a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{navOptions}</ul>
        </div>
        {/* <div className='navbar-end'>
          {user?.email ? (
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black'
              >
                <li>
                  <a className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => dispatch(logOut())}>
                  <Link>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <li className='list-none'>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </div> */}
      </div>
    </>
  )
}

export default DashboardNavbar
