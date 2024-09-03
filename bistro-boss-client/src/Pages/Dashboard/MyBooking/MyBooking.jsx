import { useEffect } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { useDispatch, useSelector } from 'react-redux'
import { bookingReset, cancelMyBooking, getMyBooking } from '../../../Redux/Slice/bookingSlice'
import { MdCancel } from 'react-icons/md'
import Swal from 'sweetalert2'

const MyBooking = () => {
  const {bookings,isDeleteBookingError,isDeleteBookingSuccess} = useSelector(state => state.booking)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMyBooking())
  },[dispatch])

  useEffect(()=>{
    if(isDeleteBookingSuccess){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully Booking has been cancelled',
            showConfirmButton: false,
            timer: 3000
          })
    }
    if(isDeleteBookingError){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 3000
          })
    }
    dispatch(bookingReset())
  },[dispatch, isDeleteBookingError, isDeleteBookingSuccess])

  const convertDateFormat = value =>{
    const date = new Date(value)
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: undefined };
    return date.toLocaleDateString('en-US', options)
  }
  const isCancelAllowed = data=>{
    const today = new Date()
    const bookingDate = new Date(data)
    return bookingDate > today
  }

  const handleCancelBooking = id =>{
    dispatch(cancelMyBooking(id))
  }

  return (
    <section>
      <SectionTItle heading={'My Bookings'} subHeading={'Excellent Ambience'} />
      <div className='p-4 ml-10 bg-slate-100 rounded-md'>
        <div className='flex justify-evenly mt-2 mb-2'>
          <h1 className='uppercase text-3xl'>
            Total Orders: {bookings?.length}
          </h1>
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>DETAILS</th>
                <th>GUEST NUMBER</th>
                <th className='text-center'>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((item, index) => (
                <tr key={item?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className='flex items-center gap-3'>
                      <h1>{item?.name}</h1>
                    </div>
                  </td>
                  <td>{item?.people} guests</td>
                  <td className='text-center'>{convertDateFormat(item?.date)}</td>
                  <td>
                    <div className='space-x-2 flex justify-start items-center'>
                        <button onClick={()=>handleCancelBooking(item?._id)} disabled={!isCancelAllowed(item?.date)} className='btn btn-error text-xl'> <MdCancel/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default MyBooking
