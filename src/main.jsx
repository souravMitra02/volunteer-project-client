import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import { Helmet } from 'react-helmet'
import Aos from 'aos'
import 'aos/dist/aos.css';
 Aos.init({
    duration: 800,
    once: false,
  });
createRoot(document.getElementById('root')).render(
  <StrictMode>
       <AuthProvider>
       <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
