/* eslint-disable no-unused-vars */
import React from 'react'

const Pagination = ({ totalPage }) => {
  // Create an array of page numbers
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1)

  return (
    <div className='join'>
      {pages.map((page, index) => (
        <input
          key={index}
          className='join-item btn btn-square'
          type='radio'
          name='options'
          aria-label={index + 1}
          checked={index===0&&'checked'}
        />
      ))}
    </div>
  )
}

export default Pagination
