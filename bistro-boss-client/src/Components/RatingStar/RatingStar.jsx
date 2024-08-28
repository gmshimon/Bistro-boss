import React, { useState } from 'react'

const RatingStar = ({handleRatingCheck,rating}) => {

  return (
    <div className='rating rating-lg rating-half mt-8' onChange={handleRatingCheck}>
      <input
        type='radio'
        name='rating-10'
        className='rating-hidden'
        value="0"
        checked={rating === null} // Ensure no star is selected initially
        readOnly
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-1 bg-orange-500'
        value="0.5"
        checked={rating === "0.5"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-2 bg-orange-500'
        value="1"
        checked={rating === "1"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-1 bg-orange-500'
        value="1.5"
        checked={rating === "1.5"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-2 bg-orange-500'
        value="2"
        checked={rating === "2"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-1 bg-orange-500'
        value="2.5"
        checked={rating === "2.5"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-2 bg-orange-500'
        value="3"
        checked={rating === "3"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-1 bg-orange-500'
        value="3.5"
        checked={rating === "3.5"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-2 bg-orange-500'
        value="4"
        checked={rating === "4"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-1 bg-orange-500'
        value="4.5"
        checked={rating === "4.5"}
      />
      <input
        type='radio'
        name='rating-10'
        className='mask mask-star-2 mask-half-2 bg-orange-500'
        value="5"
        checked={rating === "5"}
      />
    </div>
  );
};

export default RatingStar
