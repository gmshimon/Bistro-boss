/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import FoodCard from './FoodCard'
import Pagination from '../Paginition/Pagination'

const OrderTab = ({ items }) => {
  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(items?.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const cartItems = items?.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {cartItems.map(item => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
      <div className='my-5'>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>

    </>
  )
}

export default OrderTab
