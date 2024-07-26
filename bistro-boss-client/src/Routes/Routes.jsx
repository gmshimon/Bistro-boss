import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../Pages/Home/Home'
import Menu from '../Pages/Menu/Menu'
import Order from '../Pages/Order/Order'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute'
import Secret from '../Pages/Secret/Secret'

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
  }
])
