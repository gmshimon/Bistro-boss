import React from 'react'
import { FaWallet } from 'react-icons/fa'
import { FaShop } from 'react-icons/fa6'
import { PiPhoneCallLight } from 'react-icons/pi'

const Boxes = () => {
  const data = [
    {
      title: 'Menu',
      count: 205,
      icon: <FaWallet className='text-4xl' />,
      color1: 'from-purple-500',
      color2: 'to-pink-100'
    },
    {
      title: 'Shop',
      count: 103,
      icon: <FaShop className='text-4xl' />,
      color1: 'from-orange-500',
      color2: 'to-orange-100'
    },
    {
      title: 'Contact',
      count: 3,
      icon: <PiPhoneCallLight className='text-4xl' />,
      color1: 'from-red-500',
      color2: 'to-red-100'
    }
  ]
  return (
    <div className='mt-5'>
      <div className='md:flex'>
        {data.map(item => (
          <div key={item?.name} className='w-[300px] md:mr-10 mb-5'>
            <div
              className={`flex items-center justify-center text-white bg-gradient-to-r ${item?.color1} ${item?.color2} rounded-md  h-[100px]`}
            >
              {item?.icon}
              <div className='ml-7 text-center'>
                <span className='text-3xl font-bold'>{item?.count}</span>
                <br />
                <span className='text-xl'>{item?.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Boxes
