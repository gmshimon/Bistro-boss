import React, { useEffect } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrder } from '../../../Redux/Slice/OrderSlice'

const PaymentHistory = () => {
  const { orders } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrder())
  }, [dispatch])

  const formatDate = dateString => {
    const date = new Date(dateString)

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    const formattedDate = date.toLocaleDateString('en-US', options)
    return formattedDate
  }
  return (
    <section>
      <SectionTItle heading={'Payment History'} subHeading={'At a Glance'} />

      <div className='p-4 ml-10 bg-slate-50 rounded-md'>
        <div className='mb-5'>
          <h1 className='text-2xl font-semibold'>Total Payment : {orders?.length}</h1>
        </div>
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            {/* head */}
            <thead className='bg-orange-500 text-white'>
              <tr>
                <th>DETAILS</th>
                <th>CATEGORY</th>
                <th>TOTAL PRICE</th>
                <th>PAYMENT DATE</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(item => (
                <tr key={item?._id}>
                  <td>
                    <div>
                      <div className='font-bold'>{item?.name}</div>
                      <div className='text-sm opacity-50'>{item?.email}</div>
                    </div>
                  </td>
                  <td>Food Order</td>
                  <td>${item?.total_price}</td>
                  <td>{formatDate(item?.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default PaymentHistory
