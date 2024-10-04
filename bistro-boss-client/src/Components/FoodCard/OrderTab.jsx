/* eslint-disable no-unused-vars */
import React from 'react';
import FoodCard from './FoodCard';

const OrderTab = ({items}) => {
    return (
        <div className='grid md:grid-cols-2 gap-10'>
            {
                items.map(item=><FoodCard key={item._id} item={item}/>)
            }
            </div>
    );
};

export default OrderTab;