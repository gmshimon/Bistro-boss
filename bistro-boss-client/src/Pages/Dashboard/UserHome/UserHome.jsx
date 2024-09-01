import React, { useEffect } from 'react'
import Boxes from '../../../Components/Boxes/Boxes'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { MdOutlineCalculate, MdOutlineStarPurple500 } from 'react-icons/md'
import { getUserDetails } from '../../../Redux/Slice/AuthSlice'

const UserHome = () => {
  const { userDetails } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserDetails())
  },[dispatch])

  return (
    <section className='mx-5'>
      <h1 className='uppercase text-3xl mt-5'>Hi, Welcome Back!</h1>
      <div>
        <Boxes />
      </div>
      <div className='lg:flex'>
        <div className='bg-orange-300 flex justify-center items-center lg:w-1/2 p-5 rounded-lg lg:mr-10 mb-10 lg:mb-0'>
          <div>
            <div className='flex justify-center'>
            <div className='w-32'>
              <img className='rounded-full' src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
            </div>
            </div>
            <h1 className='text-2xl text-center mt-5'>{userDetails?.user?.name}</h1>
          </div>
        </div>
        <div className='bg-yellow-100 flex justify-start items-center lg:w-1/2 lg:h-[350px] p-5 rounded-lg'>
          <div className='ml-16'>
            <h1 className='uppercase text-3xl'>Your Activities</h1>
            <div className=' uppercase font-semibold mt-6 text-xl'>
              <p className='flex items-center gap-4 mb-3 text-blue-600'> <FaShoppingCart/> Orders: {userDetails?.orders?.length}</p>
              <p className='flex items-center gap-4 mb-3 text-green-600'> <MdOutlineStarPurple500/> Reviews: {userDetails?.reviews?.length}</p>
              <p className='flex items-center gap-4 text-orange-800'> <MdOutlineCalculate/> Bookings: 6</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserHome
