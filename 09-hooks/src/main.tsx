import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'modern-normalize/modern-normalize.css'
import { Home, Data } from './pages'
import { urls } from './constants'

const router = createBrowserRouter([
  {
    path: urls.home,
    element: <Home />,
  },
  {
    path: urls.data,
    element: <Data />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
