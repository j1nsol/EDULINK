import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from './firebase';
import Landing from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import StudentProfile from './pages/StudentProfile';
import Accounttab from './pages/accounttab';
import Registration from './pages/registration';
import Schedule from './pages/Schedule';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/student/dashboard",
    element: <PrivateRoute element={Dashboard} />,
  },
  {
    path: "/student/profile",
    element: <PrivateRoute element={StudentProfile} />,
  },
  {
    path: "/student/account",
    element: <PrivateRoute element={Accounttab} />,
  },
  {
    path: "/student/registration",
    element: <PrivateRoute element={Registration} />,
  },
  {
    path: "/student/schedule",
    element: <PrivateRoute element={Schedule} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
