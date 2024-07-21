/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Cover from '../../Components/Cover/Cover'
import orderImg from '../../assets/shop/banner2.jpg'
import { useSelector } from 'react-redux'
import FoodCard from '../../Components/FoodCard/FoodCard'
import OrderTab from '../../Components/FoodCard/OrderTab'

const Order = () => {
  const { menu, desserts, soups, salads, pizzas, drinks } = useSelector(
    state => state.menu
  )
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div>
      <Cover
        img={orderImg}
        title={'Our Shoo'}
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
            <OrderTab items={salads}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizzas}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soups}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={desserts}/>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Order
