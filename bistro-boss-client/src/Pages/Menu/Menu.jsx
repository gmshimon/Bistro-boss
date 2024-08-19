/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Cover from '../../Components/Cover/Cover'
import banner from '../../assets/menu/banner3.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import PopularMenu from '../../Components/PopularMenu/PopularMenu'
import { useSelector, useDispatch } from 'react-redux'
import SectionTItle from '../../Components/SectionTitle/SectionTItle'
import MenuCategory from '../../Components/MenuCategory/MenuCategory'
import { setLimit, setPage } from '../../Redux/Slice/menuSlice'

const Menu = () => {
  const { menu, desserts, soups, salads, pizzas, offered } = useSelector(
    state => state.menu
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPage(0))
    dispatch(setLimit(0))
  }, [dispatch])
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover
        img={banner}
        title={'Our Menu'}
        subtitle={'Would you like to try a dish?'}
      />
      <SectionTItle subHeading={"Don't Miss"} heading={"Today's Offer"} />
      {/* offered item section */}
      <MenuCategory items={offered} />
      {/* dessert  */}
      <MenuCategory
        items={desserts.slice(0, 5)}
        title={'Dessert'}
        img={dessertImg}
        subtitle={
          'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
      />
      {/* pizza section */}
      <MenuCategory
        items={pizzas.slice(0, 5)}
        title={'Pizza'}
        img={pizzaImg}
        subtitle={
          'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
      />
      {/* Salad section */}
      <MenuCategory
        items={salads.slice(0, 5)}
        title={'Salad'}
        img={saladImg}
        subtitle={
          'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
      />
      {/* Soup section */}
      <MenuCategory
        items={soups.slice(0, 5)}
        title={'Soup'}
        img={soupImg}
        subtitle={
          'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
      />
    </div>
  )
}

export default Menu
