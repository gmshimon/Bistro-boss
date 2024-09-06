import { useEffect } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooking } from '../../../Redux/Slice/bookingSlice'

const AdminManageBooking = () => {
  const { bookings } = useSelector(state => state.booking)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBooking())
  }, [dispatch])

  const convertDateFormat = value => {
    const date = new Date(value)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: undefined
    }
    return date.toLocaleDateString('en-US', options)
  }
  const convertTime = time => {
    let [hours, minutes] = time.split(':')
    let period = 'AM'

    hours = parseInt(hours)

    if (hours >= 12) {
      period = 'PM'
      if (hours > 12) {
        hours -= 12
      }
    } else if (hours === 0) {
      hours = 12
    }

    return `${hours}:${minutes} ${period}`
  }
  return (
    <section>
      <SectionTItle
        heading={'Manage All Bookings'}
        subHeading={'At a Glance'}
      />
      <div className='p-4 ml-10 bg-slate-100 rounded-md'>
        <div className='flex justify-evenly mt-2 mb-2'>
          <h1 className='uppercase text-3xl font-bold mb-3'>
            Total Bookings: {bookings?.length}
          </h1>
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>DETAILS</th>
                <th>PHONE</th>
                <th>GUEST NUMBER</th>
                <th className='text-center'>DATE</th>
                <th>TIME</th>
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
                  <td>{item?.phone}</td>
                  <td>{item?.people} guests</td>
                  <td className='text-center'>
                    {convertDateFormat(item?.date)}
                  </td>
                  <td>{convertTime(item?.time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminManageBooking
