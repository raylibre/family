import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { LandingPageRoute } from './product/LandingPageRoute'
import { DonorBrowseRoute } from './product/DonorBrowseRoute'
import { FamilyRegistrationRoute } from './product/FamilyRegistrationRoute'
import { AdminRoute } from './product/AdminRoute'
import { FamilyProfileRoute } from './product/FamilyProfileRoute'

const router = createBrowserRouter([
  { path: '/', element: <LandingPageRoute /> },
  { path: '/browse', element: <DonorBrowseRoute /> },
  { path: '/family/:id', element: <FamilyProfileRoute /> },
  { path: '/register', element: <FamilyRegistrationRoute /> },
  { path: '/admin', element: <AdminRoute /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
