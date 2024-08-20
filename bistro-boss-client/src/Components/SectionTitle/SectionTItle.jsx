/* eslint-disable no-unused-vars */
import React from 'react';

const SectionTItle = ({heading,subHeading}) => {
    return (
        <div className='mx-auto text-center md:w-5/12 my-8'>
            <p className='text-yellow-600 mb-2 italic'>--- {subHeading} ---</p>
            <h3 className='text-3xl uppercase border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTItle;