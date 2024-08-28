import React, { useEffect, useState } from 'react'
import SectionTItle from '../../../Components/SectionTitle/SectionTItle'
import RatingStar from '../../../Components/RatingStar/RatingStar'
import { IoIosRocket } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { createReview, reset } from '../../../Redux/Slice/ReviewSlice'
import Swal from 'sweetalert2'

const AddReview = () => {
  const { isCreateReviewSuccess, isCreateReviewError } = useSelector(
    state => state.review
  )
  const [rating, setRating] = useState(null)
  const [recipeLike, setRecipeLike] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [details, setDetails] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (isCreateReviewSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Review successfully created',
        showConfirmButton: false,
        timer: 3000
      })
    } else if (isCreateReviewError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 3000
      })
    }
    setRating(null)
    setRecipeLike('')
    setSuggestion('')
    setDetails('')
    dispatch(reset())
  }, [isCreateReviewSuccess, isCreateReviewError, dispatch])

  // function to handle the rating changes
  const handleRatingCheck = e => {
    setRating(e.target.value)
  }

  const handleSubmitReview = e => {
    e.preventDefault()

    const reviewData = {
      recipeLike: recipeLike,
      suggestion: suggestion,
      details: details,
      rating: parseInt(rating)
    }
    dispatch(createReview(reviewData))
  }
  return (
    <section>
      <SectionTItle
        heading={'Sharing is Caring'}
        subHeading={'Give A Review'}
      />
      <section className='flex justify-center'>
        <div className='bg-slate-200 px-40 py-5 rounded-lg'>
          <div>
            <h1 className='text-3xl text-center'>Rate Us</h1>
            <div className='text-center'>
              <RatingStar
                handleRatingCheck={handleRatingCheck}
                rating={rating}
              />
            </div>
            <div className='w-full'>
              <form className='w-full' onSubmit={handleSubmitReview}>
                <div className='my-4'>
                  <label className='font-semibold' htmlFor='recipeLike'>
                    Which recipe you liked most?
                  </label>
                  <input
                    name='recipeLike'
                    type='text'
                    placeholder='Recipe you liked most'
                    className='input input-bordered w-full mt-2'
                    value={recipeLike}
                    onChange={e => setRecipeLike(e.target.value)}
                  />
                </div>
                <div className='my-4'>
                  <label className='font-semibold' htmlFor='suggestion'>
                    Do you have any suggestion for us?
                  </label>
                  <input
                    name='suggestion'
                    type='text'
                    placeholder='Suggestion'
                    className='input input-bordered w-full mt-2'
                    value={suggestion}
                    onChange={e => setSuggestion(e.target.value)}
                  />
                </div>
                <div className='mt-4'>
                  <label className='font-semibold' htmlFor='details'>
                    Kindly express your care in a short way
                  </label>
                  <textarea
                    name='details'
                    className='textarea textarea-bordered h-24 w-full mt-2'
                    placeholder='Review in detail'
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    // disabled={disabled}
                    className='btn btn-warning'
                    type='submit'
                  >
                    Send Review <IoIosRocket />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default AddReview
