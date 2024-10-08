/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
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
import { MdOutlineMenu, MdOutlinePayment, MdOutlineRateReview } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import CurrentUser from '../utilis/CurrentUser'
import { logOut } from '../Redux/Slice/AuthSlice'
import DashboardNavbar from '../Components/Navbar/DashboardNavbar'

const Dashboard = () => {
  const { cartItems } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  CurrentUser()


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkTokenExpiration = () => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      const { expiration } = JSON.parse(storedToken);
      const currentTime = new Date().getTime();
      if (currentTime > expiration) {
        // Token has expired, log out the user
        localStorage.removeItem('userToken');
        // Redirect to the login page or show a logged-out state
        dispatch(logOut());
        window.location.href = "/";
        // history.push('/login');
      }
    }
  };

  useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(tokenExpirationInterval);
  }, []);

  return (
    // <div className='flex'>
    //   <div className='w-64 min-h-screen bg-orange-400'>
    //     <ul className='menu'>
    //       {user?.role === 'admin' ? (
    //         <>
    //         <li>
    //           <NavLink to='/dashboard/admin-home'>
    //             <FaHome />
    //             Admin Home
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to='/dashboard/admin-add-items'>
    //             <FaUtensils/>
    //             Add Items
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to='/dashboard/admin-manage-items'>
    //             <FaList/>
    //             Manage Items
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to='/dashboard/admin-manage-bookings'>
    //             <FaBook />
    //             Manage Bookings
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to='/dashboard/all-user'>
    //           <FaUsers />
    //             All Users
    //           </NavLink>
    //         </li>
    //       </>
    //       ) : (
    //         <>
    //           <li>
    //             <NavLink to='/dashboard/user-home'>
    //               <FaHome />
    //               User Home
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/dashboard/reservation'>
    //               <FaCalendar />
    //               Reservation
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/dashboard/cart'>
    //               <FaShoppingCart />
    //               My Cart ({cartItems.length})
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/dashboard/payment-history'>
    //               <MdOutlinePayment />
    //               Payment History
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/dashboard/add-review'>
    //               <MdOutlineRateReview />
    //               Add Review
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/dashboard/my-booking'>
    //               <FaList />
    //               My Bookings
    //             </NavLink>
    //           </li>
    //         </>
    //       )}
    //       <div className='divider'></div>
    //       <li>
    //         <NavLink to='/'>
    //           <FaHome />
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to='/menu'>
    //           <MdOutlineMenu />
    //           Menu
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className='flex-1'>
    //     <Outlet />
    //   </div>
    // </div>
    <div>
      <DashboardNavbar/>
      <div className="pt-16">
      <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
