/* eslint-disable react-hooks/exhaustive-deps */
import { FaUtensils } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleMenuItem, updateMenuItem } from '../../Redux/Slice/menuSlice'
import { useEffect, useState } from 'react'

const EditMenu = ({ id }) => {
  const { menu } = useSelector(state => state.menu)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [recipe, setRecipe] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSingleMenuItem(id))
  }, [dispatch, id])
  useEffect(() => {
    setName(menu?.name)
    setCategory(menu?.category)
    setPrice(menu?.price)
    setRecipe(menu?.recipe)
  }, [menu])

  const handleUpdateItem = async e => {
    e.preventDefault()

    const data = {
      id,
      name,
      category,
      price: parseFloat(price),
      recipe
    }
    console.log(data)
    dispatch(updateMenuItem({ id: id, data: data }))
  }
  return (
    <section>
      <div className='flex justify-center'>
        <div className=' bg-slate-100 px-10 py-7 w-full lg:w-[900px] rounded-md'>
          <div className='flex justify-center mb-6'>
            <img src={menu?.image} className='h-[60px] w-[80px]' alt='' />
          </div>
          <form className='max-w-full' onSubmit={handleUpdateItem}>
            <div className=''>
              <div>
                <label htmlFor='name'>Recipe Name *</label>
              </div>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
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
                  value={category}
                  onChange={e => setCategory(e.target.value)}
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
                  value={price}
                  onChange={e => setPrice(e.target.value)}
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
                onChange={e => setRecipe(e.target.value)}
                value={recipe}
                name='details'
                className='textarea textarea-bordered h-24 w-full'
                placeholder='Recipe Details'
              ></textarea>
            </div>
            {/* <div className='mt-4'>
              <input
                type='file'
                accept='image/*'
                name='file'
                className='file-input w-full max-w-xs'
              />
            </div> */}
            <div className='mt-4 flex justify-center'>
              <button className='btn btn-active btn-warning text-white'>
                Update Item <FaUtensils />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditMenu
