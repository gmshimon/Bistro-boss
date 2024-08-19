/* eslint-disable no-unused-vars */
import React from 'react'

const Table = ({ menus, headers,action1,action2,button1 }) => {
  return (
    <div>
      <div className='overflow-x-auto pl-10'>
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
            {menus.map((item, index) => (
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
                    // onClick={() => handleDeleteItem(item._id)}
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
    </div>
  )
}

export default Table
