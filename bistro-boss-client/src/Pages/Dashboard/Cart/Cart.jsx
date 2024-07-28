/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItems, getCartItems, resetCart } from '../../../Redux/Slice/CartSlice'
import Swal from 'sweetalert2'

const Cart = () => {
  const { user } = useSelector(state => state.auth)
  const { cartItems, isCartDeleteSuccess } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCartItems(user?.email))
  }, [dispatch, user?.email])

  const totalPrice = cartItems.reduce((totalPrice, item) => {
    return totalPrice + item.price
  }, 0)

  const handleDeleteItem = itemId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteCartItems(itemId))
        if(isCartDeleteSuccess){
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            })
            dispatch(resetCart)
        }
      }
    })
  }
  return (
    <div className='p-4'>
      <div className='flex justify-evenly'>
        <h1 className='uppercase text-3xl'>
          Total Orders: {cartItems?.length}
        </h1>
        <h1 className='uppercase text-3xl'>Total Price: ${totalPrice}</h1>
        <button className='btn btn-primary'>Pay</button>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM IMAGE</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src={item?.image}
                          alt='Avatar Tailwind CSS Component'
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>{item?.price}</td>
                <th>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
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
  )
}

export default Cart
