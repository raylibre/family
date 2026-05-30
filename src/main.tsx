import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const LandingPageRoute      = lazy(() => import('./product/LandingPageRoute').then(m => ({ default: m.LandingPageRoute })))
const DonorBrowseRoute      = lazy(() => import('./product/DonorBrowseRoute').then(m => ({ default: m.DonorBrowseRoute })))
const FamilyProfileRoute    = lazy(() => import('./product/FamilyProfileRoute').then(m => ({ default: m.FamilyProfileRoute })))
const FamilyRegistrationRoute = lazy(() => import('./product/FamilyRegistrationRoute').then(m => ({ default: m.FamilyRegistrationRoute })))
const AdminRoute            = lazy(() => import('./product/AdminRoute').then(m => ({ default: m.AdminRoute })))

const router = createBrowserRouter([
  { path: '/',         element: <LandingPageRoute /> },
  { path: '/browse',   element: <DonorBrowseRoute /> },
  { path: '/family/:id', element: <FamilyProfileRoute /> },
  { path: '/register', element: <FamilyRegistrationRoute /> },
  { path: '/admin',    element: <AdminRoute /> },
])

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
    <RouterProvider router={router} />
  </Suspense>,
)
