/* eslint-disable no-unused-vars */
import React from 'react'
import SectionTItle from '../../Components/SectionTitle/SectionTItle'
import { FaUtensils } from "react-icons/fa";

const AddItems = () => {
    const handleAddItem = (e) => {
        e.preventDefault();
        const form=e.target
        const name = form.name.value
        const category = form.category.value
        const price = form.price.value
        const details = form.details.value

        console.log({
            name,
            category,
            price,
            details,
        });
        // add item to the database
        // navigate to the menu page
    }
  return (
    <section>
      <SectionTItle heading={'add an item'} subHeading={"What's New"} />
      <div className='flex justify-center'>
        <div className=' bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md'>
          <form className='max-w-full' onSubmit={handleAddItem}>
            <div className=''>
              <div>
                <label htmlFor='name'>Recipe Name *</label>
              </div>
              <input
                name='name'
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full  mt-2'
              />
            </div>
            <div className='max-w-full flex flex-col lg:flex-row lg:space-x-4 mt-4'>
              <div className='flex-1'>
                <div>
                  <label htmlFor='category'>Category *</label>
                </div>
                <select name='category' className='select select-bordered w-full '>
                  <option selected disabled>
                    Select category
                  </option>
                  <option value="Han Solo">Han Solo</option>
                  <option value={"Greedo"}>Greedo</option>
                </select>
              </div>
              <div className='flex-1 mt-4 md:mt-0'>
                <div>
                  <label htmlFor='price'>Price *</label>
                </div>
                <input
                  name='price'
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full '
                />
              </div>
            </div>
            <div className='mt-4'>
              <div>
                <label htmlFor='details'>Recipe Details *</label>
              </div>
              <textarea
              name='details'
                className='textarea textarea-bordered h-24 w-full'
                placeholder='Recipe Details'
              ></textarea>
            </div>
            <div className='mt-4'>
              <input type='file' className='file-input w-full max-w-xs' />
            </div>
            <div className='mt-4'>
            <button className="btn btn-active btn-warning text-white">Add Item <FaUtensils/></button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddItems
