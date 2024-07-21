/* eslint-disable no-unused-vars */
import React from 'react'

const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item

  return (
    <div className='card card-compact bg-base-100 w-96 shadow-xl'>
      <figure>
        <img
          src={image}
          alt='Shoes'
        />
      </figure>
      <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>${price}</p>
      <div className='card-body'>
        <h2 className='card-title text-center'>{name}</h2>
        <p>{recipe}</p>
        <div className='card-actions justify-center'>
          <button className='btn btn-outline border-0 border-b-4 border-orange-400 mt-4'>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
