import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { PrivateRoute, GuestRoute } from '../components/Common/RouteGuards'
import MainLayout from '../layouts/MainLayout'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const FeedPage = lazy(() => import('../pages/FeedPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export const routes = [
  {
    path: '/',
    element: <Navigate to="/feed" replace />,
  },
  
  {
    path: '',
    element: <GuestRoute />,
    children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
    ]
  },

  {
    path: '',
    element: <PrivateRoute />,
    children: [
        {
          element: <MainLayout />, 
          children: [
            { path: '/feed', element: <FeedPage /> },
          ]
        }
    ]
  },

  {
    path: '*',
    element: <NotFoundPage />,
  }
]
