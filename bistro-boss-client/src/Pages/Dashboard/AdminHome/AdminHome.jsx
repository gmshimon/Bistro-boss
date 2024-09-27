import Boxes from '../../../Components/Boxes/Boxes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAdminDetails } from '../../../Redux/Slice/AuthSlice'
import BarChart from '../../../Components/BarChart/BarChart'
import PieChart from '../../../Components/PieChart/PieChart'
// Initialize the 3D module
const AdminHome = () => {
  const { adminDetails, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAdminDetails())
  }, [dispatch])
  return (
    <section className='mx-5'>
      <h1 className='uppercase text-3xl mt-5'>Hi, Welcome Back!</h1>
      <div>
        <Boxes user={user} adminDetails={adminDetails} />
      </div>
      <div className='lg:flex lg:space-x-40 mt-16'>
        <div className='flex-1 '>
          <BarChart sold={adminDetails?.orders} />
        </div>
        <div className='flex-1'>
          <PieChart product={adminDetails?.products}/>
        </div>
      </div>
    </section>
  )
}

export default AdminHome
