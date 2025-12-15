// src/app/Router.tsx
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  { 
    path: '/login', 
    element: <LoginPage /> 
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);
