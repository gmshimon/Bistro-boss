/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Pagination from '../Paginition/Pagination'

const Table = ({ menus, headers,action1,action2,button1,button2 }) => {

  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.ceil(menus?.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const cartItems = menus?.slice(indexOfFirstItem, indexOfLastItem)
  return (
    <div>
      <div className='overflow-x-auto pl-10 h-[405px]'>
        <table className='table'>
          {/* head */}
          <thead className='bg-orange-600 text-white text-1xl'>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
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
                <td>
                  <button
                    disabled={item?.role === 'admin'}
                    onClick ={()=>button1(item._id)}
                    // onClick={() => handleDeleteItem(item._id)}
                    className='btn btn-warning'
                  >
                    { action1}
                  </button>
                </td>
                <th>
                  <button
                    onClick={() => button2(item._id)}
                    className='btn btn-error'
                  >
                    {action2}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='my-5'>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>
    </div>
  )
}

export default Table
