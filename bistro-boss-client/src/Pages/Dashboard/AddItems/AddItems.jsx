/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { FaUtensils } from 'react-icons/fa'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addMenuItem, reset } from '../../../Redux/Slice/menuSlice'
import Swal from 'sweetalert2'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'

const image_hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_url = `https://api.imgbb.com/1/upload?key=${image_hosting}`
const AddItems = () => {
  const { isCreateMenuError, isCreateMenuSuccess } = useSelector(
    state => state.menu
  )
  const dispatch = useDispatch()
  const handleAddItem = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const details = form.details.value
    const file = form.file.files[0]

    const formData = new FormData()
    formData.append('image', file)

    const res = await axios.post(image_url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const data = {
      name,
      category,
      price,
      recipe: details,
      image: res.data.data.display_url
    }
    dispatch(addMenuItem(data))
    form.reset()
  }
  useEffect(()=>{
    if(isCreateMenuError){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500
        });
        dispatch(reset())
    }
    if(isCreateMenuSuccess){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New Item has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        dispatch(reset())
    }
  },[dispatch, isCreateMenuError, isCreateMenuSuccess])
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
                required
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
                <select
                  name='category'
                  className='select select-bordered w-full '
                >
                  <option selected disabled value={''}>
                    Select category
                  </option>
                  <option value='salad'>Salad</option>
                  <option value='drinks'>Drinks</option>
                  <option value='popular'>Popular</option>
                  <option value='dessert'>Dessert</option>
                  <option value='pizza'>Pizza</option>
                  <option value='soup'>Soup</option>
                  <option value='offered'>Offered</option>
                </select>
              </div>
              <div className='flex-1 mt-4 md:mt-0'>
                <div>
                  <label htmlFor='price'>Price *</label>
                </div>
                <input
                  required
                  name='price'
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full '
                />
              </div>
            </div>
            <div className='mt-4'>
              <div>
                <label htmlFor='details'>Recipe Details</label>
              </div>
              <textarea
                name='details'
                className='textarea textarea-bordered h-24 w-full'
                placeholder='Recipe Details'
              ></textarea>
            </div>
            <div className='mt-4'>
              <input
                type='file'
                accept='image/*'
                name='file'
                className='file-input w-full max-w-xs'
              />
            </div>
            <div className='mt-4'>
              <button className='btn btn-active btn-warning text-white'>
                Add Item <FaUtensils />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddItems
