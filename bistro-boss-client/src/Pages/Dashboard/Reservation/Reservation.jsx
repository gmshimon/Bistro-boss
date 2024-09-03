import { useEffect, useState } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { FaCalendarAlt } from 'react-icons/fa'
import ContactSection from '../../../Components/ContactSection/ContactSection'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { bookingReset, createBooking } from '../../../Redux/Slice/bookingSlice'

const Reservation = () => {
  const {user} = useSelector(state=>state.auth)
  const {booking,errorMessage,isCreateBookingSuccess,isCreateBookingError} = useSelector(state=>state.booking)
    const [date,setDate] = useState('')
    const [time, setTime] = useState('')
    const [people, setPeople] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const dispatch = useDispatch()

    useEffect(()=>{
      if(isCreateBookingSuccess){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Table ${booking?.table?.tableNumber} has been Booked for you`,
          showConfirmButton: false,
          timer: 3000
        })
        dispatch(bookingReset())
      }
      if(isCreateBookingError){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 3000
        })
      }
    },[isCreateBookingSuccess, booking, isCreateBookingError, dispatch, errorMessage])

    const handleBookTable = e =>{
        e.preventDefault()
        const data = {
            date,
            time,
            people,
            name,
            phone,
            email:user?.email
        }
        dispatch(createBooking(data))
        setDate('')
        setTime('')
        setPeople('')
        setName('')
        setPhone('')
    }
  return (
    <section>
      <SectionTItle heading={'Book A Table'} subHeading={'Reservation'} />
      <div className='flex justify-center'>
        <form onSubmit={handleBookTable}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='my-4'>
              <label htmlFor='date' className='font-semibold'>
                Date *
              </label>
              <input
              value={date}
              onChange={e=>setDate(e.target.value)}
                required
                name='date'
                type='date'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
            <div className='my-4'>
              <label htmlFor='time' className='font-semibold'>
                Time *
              </label>
              <input
              value={time}
              onChange={e=>setTime(e.target.value)}
                required
                name='time'
                type='time'
                placeholder='Type here'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
            <div className='my-4'>
              <label htmlFor='guest' className='font-semibold'>
                Guest *
              </label>
              <select
              onChange={e=>setPeople(e.target.value)}
                required
                name='guest'
                className='select select-bordered w-full mt-2 '
              >
                <option selected disabled value={''}>
                  Select category
                </option>
                <option value='1'>1 Person</option>
                <option value='2'>2 Person</option>
                <option value='4'>4 Person</option>
                <option value='6'>6 Person</option>
                <option value='10'>10 Person</option>
              </select>
            </div>
            <div className='my-4'>
              <label htmlFor='name' className='font-semibold'>
                Name *
              </label>
              <input
              value={name}
              onChange={e=>setName(e.target.value)}
                required
                name='name'
                type='text'
                placeholder='your Name'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
            <div className='my-4'>
              <label htmlFor='phone' className='font-semibold'>
                Phone *
              </label>
              <input
              onChange={e=>setPhone(e.target.value)}
                required
                name='phone'
                type='text'
                placeholder='Phone Number'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
            <div className='my-4'>
              <label htmlFor='email' className='font-semibold'>
                Email *
              </label>
              <input
              value={user?.email}
              readOnly
              // onChange={e=>setEmail(e.target.value)}
                required
                name='email'
                type='email'
                placeholder='Email'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              className='btn btn-warning w-[200px] text-white'
              type='submit'
            >
              Book A table <FaCalendarAlt />
            </button>
          </div>
        </form>
      </div>
      <ContactSection/>
    </section>
  )
}

export default Reservation
