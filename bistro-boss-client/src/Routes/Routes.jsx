import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home'
import Menu from '../Pages/Menu/Menu'
import Order from '../Pages/Order/Order'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute'
import Secret from '../Pages/Secret/Secret'
import Dashboard from '../Layout/Dashboard'
import AllUser from '../Pages/Dashboard/AllUser/AllUser'
import Cart from '../Pages/Dashboard/Cart/Cart'
import AdminRoute from '../Components/PrivateRoute/AdminRoute'
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems'
import AddItems from '../Pages/Dashboard/AddItems/AddItems'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'menu',
        element: <Menu></Menu>
      },
      {
        path: 'order/:category',
        element: <Order></Order>
      },
      {
        path:"login",
        element: <Login/>
      },
      {
        path:"register",
        element:<Registration/>
      },
      {
        path:"secret",
        element:<PrivateRoute><Secret/></PrivateRoute>
      }
    ]
  },
  {
    path:'dashboard/',
    element:<Dashboard/>,
    children:[
      {
        path:'cart',
        element:<PrivateRoute><Cart/></PrivateRoute>
      },
      {
        path:'all-user',
        element:<AdminRoute><AllUser/></AdminRoute>
      },
      {
        path:'admin-add-items',
        element:<AdminRoute><AddItems/></AdminRoute>
        // element:<AddItems/>
      },
      {
        path:'admin-manage-items',
        element:<AdminRoute><ManageItems/></AdminRoute>
      }
    ]
  }
])
