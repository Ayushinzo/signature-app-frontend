import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextFunction from './context/ContextProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Auth from './pages/Auth.jsx'
import Authenticate from './Authenticate/Authenticate.jsx'
import SignPdf from './pages/SignPdf.jsx'
import Sign from './pages/Sign.jsx'
import Download from './pages/Download.jsx'

let router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/auth',
    element: (
      <Authenticate>
        <Auth />
      </Authenticate>
    ),
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/sign-pdf',
    element: <SignPdf/>,
    children: [
      {
        path: 'sign',
        element: <Sign/>
      }, 
      {
        path: 'download',
        element: <Download/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <ContextFunction>
      <App />
    </ContextFunction>
  </RouterProvider>
)