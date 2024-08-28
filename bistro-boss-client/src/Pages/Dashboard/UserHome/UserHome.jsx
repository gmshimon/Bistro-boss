import React from 'react'
import Boxes from '../../../Components/Boxes/Boxes'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { MdOutlineCalculate, MdOutlineStarPurple500 } from 'react-icons/md'

const UserHome = () => {
  const { user } = useSelector(state => state.auth)
  return (
    <section className='mx-5'>
      <h1 className='uppercase text-3xl mt-5'>Hi, Welcome Back!</h1>
      <div>
        <Boxes />
      </div>
      <div className='lg:flex'>
        <div className='bg-orange-300 flex justify-center items-center lg:w-1/2 p-5 rounded-lg lg:mr-10 mb-10 lg:mb-0'>
          <div>
            <div className='w-32'>
              <img className='rounded-full' src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
            </div>
            <h1 className='text-3xl text-center mt-5'>{user?.name}</h1>
          </div>
        </div>
        <div className='bg-yellow-100 flex justify-start items-center lg:w-1/2 lg:h-[350px] p-5 rounded-lg'>
          <div className='ml-16'>
            <h1 className='uppercase text-3xl'>Your Activities</h1>
            <div className=' uppercase font-semibold mt-6 text-xl'>
              <p className='flex items-center gap-4 mb-2 text-blue-600'> <FaShoppingCart/> Orders: 6</p>
              <p className='flex items-center gap-4 mb-2 text-green-600'> <MdOutlineStarPurple500/> Reviews: 6</p>
              <p className='flex items-center gap-4 mb-2 text-orange-800'> <MdOutlineCalculate/> Bookings: 6</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserHome
