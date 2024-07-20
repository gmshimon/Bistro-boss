/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import PopularMenu from '../../Components/PopularMenu/PopularMenu';
import Featured from '../../Components/Featured/Featured';
import Testimonial from '../../Components/Testimonial/Testimonial';
import Contact from '../../Components/Contact/Contact';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Category/>
           <PopularMenu/>
           <Contact/>
           <Featured/>
           <Testimonial/>
        </div>
    );
};

export default Home;