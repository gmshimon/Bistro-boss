/* eslint-disable no-unused-vars */
import React from 'react';
import SectionTItle from '../SectionTitle/SectionTItle';
import featuredImg  from '../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTItle subHeading="Check it out" heading="Featured Item"/>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2009</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reprehenderit architecto, at quod quidem nostrum! Tempore, numquam accusantium porro tenetur facere corrupti laudantium explicabo consectetur! Veniam id iure nobis inventore maxime non cum similique ea dolorum quae. Quam iusto non fugit eaque officia explicabo, soluta laborum, unde quaerat praesentium perferendis!</p>
                    <button className='btn btn-outline border-0 border-b-4'>ORDER NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;