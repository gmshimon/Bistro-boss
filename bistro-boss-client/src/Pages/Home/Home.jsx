/* eslint-disable no-unused-vars */
import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/Category/Category';
import PopularMenu from '../../Components/PopularMenu/PopularMenu';
import Featured from '../../Components/Featured/Featured';

const Home = () => {
    return (
        <div>
           <Banner/>
           <Category/>
           <PopularMenu/>
           <Featured/>
        </div>
    );
};

export default Home;