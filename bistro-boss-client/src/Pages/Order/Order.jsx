/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Cover from '../../Components/Cover/Cover'
import orderImg from '../../assets/shop/banner2.jpg'
import { useSelector } from 'react-redux'
import FoodCard from '../../Components/FoodCard/FoodCard'
import OrderTab from '../../Components/FoodCard/OrderTab'
import { useParams } from 'react-router-dom'

const Order = () => {
  const { menu, desserts, soups, salads, pizzas, drinks } = useSelector(
    state => state.menu
  )
  const categories = ['Salad', 'Pizza', 'Soup', 'Dessert', 'Drink']
  const { category } = useParams()
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex || 0)
  return (
    <div>
      <Cover
        img={orderImg}
        title={'Our Shop'}
        subtitle={'Would you like to try a dish?'}
      />
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={salads} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizzas} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={soups} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={desserts} />
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks} />
        </TabPanel>
        
      </Tabs>
    </div>
  )
}

export default Order
