/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../../Redux/Slice/CartSlice'
import { getAllUsers } from '../../../Redux/Slice/AuthSlice'
import { FaUsers } from 'react-icons/fa'

const AllUser = () => {
  const {  users } = useSelector(state => state.auth)
  const { cartItems, isCartDeleteSuccess } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      <SectionTItle heading={'Manage all Users'} subHeading={'How many??'} />
      <div>
        <div className='overflow-x-auto pl-10'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item?._id}>
                  <th>{index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>
                    <button
                      // onClick={() => handleDeleteItem(item._id)}
                      className='btn btn-warning'
                    >
                      <FaUsers />
                    </button>
                  </td>
                  <th>
                    <button
                      // onClick={() => handleDeleteItem(item._id)}
                      className='btn btn-error'
                    >
                      <MdDelete />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllUser
