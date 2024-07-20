import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import PersonalInformation from './pages/StudentProfile';
import StudentProfile from './pages/StudentProfile';
import Registration from './pages/registration';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/student/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/student/profile",
    element:<StudentProfile/>,
  },
  {
    path: "/student/registration",
    element:<Registration/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
