/* eslint-disable no-unused-vars */
import React from 'react';
import SectionTItle from '../SectionTitle/SectionTItle';
import MenuItem from '../MenuItem/MenuItem';

import { useSelector } from 'react-redux';

const PopularMenu = () => {
    const {menu,popular} = useSelector(state=>state.menu)
    return (
        <section className='mb-12'>
            <SectionTItle heading="From Our Menu" subHeading="Popular Items"/>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => <MenuItem key={item._id} item={item}/>)
                }
            </div>
            <div className='flex justify-center mt-5'>
                <button className='btn btn-outline border-0 border-b-4 mt-4'>View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;