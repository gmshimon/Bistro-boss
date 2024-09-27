import { FaTruck, FaWallet } from 'react-icons/fa'
import { FaShop } from 'react-icons/fa6'
import { GiCook } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import { PiPhoneCallLight } from 'react-icons/pi'

const Boxes = ({user,adminDetails}) => {
  console.log(adminDetails)
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

  const adminData = [
    {
      title:'Revenue',
      count:adminDetails?.revenue,
      icon: <FaWallet className='text-4xl' />,
      color1: 'from-purple-500',
      color2: 'to-pink-200'
    },
    {
      title:"Customers",
      count:adminDetails?.customers,
      icon: <IoIosPeople className='text-4xl'/>,
      color1: 'from-orange-500',
      color2: 'to-orange-200'
    },
    {
      title:"Products",
      count:adminDetails?.totalProducts,
      icon:<GiCook className='text-4xl'/>,
      color1: 'from-red-500',
      color2: 'to-red-200'
    },
    {
      title:"Orders",
      count:adminDetails?.totalOrders,
      icon:<FaTruck className='text-4xl'/>,
      color1: 'from-blue-500',
      color2: 'to-blue-200'
    }
  ]
  return (
    <div className='mt-5'>
      <div className='md:flex'>
        {user?.role == 'admin'?adminData.map(item => (
          <div key={item?.name} className='w-[220px] md:mr-10 mb-5'>
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
        )):data.map(item => (
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
