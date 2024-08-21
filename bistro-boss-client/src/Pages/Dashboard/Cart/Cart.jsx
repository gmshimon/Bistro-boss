/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incrementQuantity, resetCart } from '../../../Redux/Slice/CartSlice'
import Swal from 'sweetalert2'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import { Link } from 'react-router-dom'


const Cart = () => {
  const { user } = useSelector(state => state.auth)
  const { cartItems, isCartDeleteSuccess } = useSelector(state => state.cart)
  const [total,setTotal] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    const total = cartItems.reduce((total, item) => {
      return total + item?.totalPrice
    }, 0)
    setTotal(total)
  }, [dispatch, cartItems])
  
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
        // dispatch(deleteCartItems(itemId))
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

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  return (
    <section>
      <SectionTItle heading={"Wanna Add More?"} subHeading={"My Cart"}/>
      <div className='p-4 ml-10 bg-slate-100 rounded-md'>
      <div className='flex justify-evenly mt-2'>
        <h1 className='uppercase text-3xl'>
          Total Orders: {cartItems?.length}
        </h1>
        <h1 className='uppercase text-2xl'>Total Price: ${total.toFixed(1)}</h1>
        {
          cartItems?.length ? <Link to={"/dashboard/payment"}>
          <button className='btn btn-primary'>Pay</button>
          </Link> : <button disabled className='btn btn-primary'>Pay</button>
        }
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
                <td>{item?.totalPrice.toFixed(1)}</td>
                <td>
                  <div className="space-x-2 flex justify-start items-center">
                    <button
                      onClick={() => handleDecrementQuantity(item)}
                      className="btn btn-sm btn-square btn-outline"
                    >
                      -
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(item)}
                      className="btn btn-sm btn-square btn-outline"
                    >
                      +
                    </button>
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

export default Cart
