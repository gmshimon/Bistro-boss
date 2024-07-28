/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item
  const { user } = useSelector(state => state.auth)
  console.log(user);
  const navigate = useNavigate()

  const handleFoodItem = () => {
    if (!user && !user?.email) {
      Swal.fire({
        title: 'You are logged in',
        text: 'Please login to add the food to cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Login!'
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }
  return (
    <div className='card card-compact bg-base-100 w-96 shadow-xl'>
      <figure>
        <img src={image} alt='Shoes' />
      </figure>
      <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>
        ${price}
      </p>
      <div className='card-body'>
        <h2 className='card-title text-center'>{name}</h2>
        <p>{recipe}</p>
        <div className='card-actions justify-center'>
          <button
            onClick={handleFoodItem}
            className='btn btn-outline border-0 border-b-4 border-orange-400 mt-4'
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
