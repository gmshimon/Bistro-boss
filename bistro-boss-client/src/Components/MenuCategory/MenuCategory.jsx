/* eslint-disable no-unused-vars */
import React from 'react'
import MenuItem from '../MenuItem/MenuItem'
import Cover from '../Cover/Cover'
import { Link } from 'react-router-dom'

const MenuCategory = ({ items, img, title, subtitle }) => {
  return (
    <div className='pt-8'>
      {title && <Cover img={img} title={title} subtitle={subtitle} />}
      <div className='grid md:grid-cols-2 gap-10 mt-16'>
        {items.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
      <div className='flex flex-wrap justify-center'>
        <Link to={`/order/${title}`}>
          <div className='flex justify-center'>
            <button className='btn btn-outline border-0 border-b-4 mt-4'>
              View Full Menu
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MenuCategory
