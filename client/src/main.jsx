import React from 'react'
import ReactDOM from 'react-dom/client'
import appRouter from './App'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './utils/context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={appRouter} />
    </AuthContextProvider>
  </React.StrictMode>
)
