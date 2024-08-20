import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './Routes/Routes'
import { Provider } from 'react-redux'
import store, { persistor } from './Redux/store'
import { HelmetProvider } from 'react-helmet-async'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className='max-w-screen-xl	mx-auto'>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </div>
    </HelmetProvider>
  </React.StrictMode>
)
