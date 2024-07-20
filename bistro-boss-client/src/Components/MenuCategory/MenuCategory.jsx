/* eslint-disable no-unused-vars */
import React from 'react'
import MenuItem from '../MenuItem/MenuItem'
import Cover from '../Cover/Cover'

const MenuCategory = ({ items, img, title, subtitle }) => {
  return (
    <div className='pt-8'>
      {title && (
        <Cover
          img={img}
          title={title}
          subtitle={subtitle}
        />
      )}
      <div className='grid md:grid-cols-2 gap-10 my-16'>
        {items.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default MenuCategory
