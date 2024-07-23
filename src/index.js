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
import StudentProfile from './pages/StudentProfile';
import AboutUs from './pages/aboutUs';
import Accounttab from './pages/accounttab';
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
    path: "/about-us",
    element:<AboutUs/>,
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
    path: "/student/account",
    element:<Accounttab/>,
  },
  {
    path: "/student/registration",
    element:<Registration/>,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
