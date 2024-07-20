import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './Routes/Routes'
import { Provider } from 'react-redux'
import store from './Redux/store'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className='max-w-screen-xl	mx-auto'>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </HelmetProvider>
  </React.StrictMode>
)
