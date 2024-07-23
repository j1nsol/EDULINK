import React, { useEffect, useState } from "react";
import NavItem from './NavItem';
import { auth } from "../firebase";
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: 'Dashboard', isActive: true, to: '/student/dashboard' },
  { label: 'Profile', isActive: false, to: '/student/profile' },
  { label: 'Registration', isActive: false, to: '/student/registration' },
  { label: 'Schedule', isActive: false, to: '/student/schedule' },
  { label: 'Account', isActive: false, to: '/student/account' },
];

function Sidebar() {

    const navigate = useNavigate();

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            navigate("/login");
          })
          .catch((error) => console.log(error));
        }
  return (
    <nav className="sidebar">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/20b1f743a2c0b38a0404c2e4ddb743ea0317d9314e2b706c38386bc8d0959dd9?apiKey=c24ae5bfb01d41eab83aea3f5ce6f5d6&" alt="Logo" className="logo" />
      <div className="nav-items">
        {navItems.map((item, index) => (
          <NavItem key={index} label={item.label} isActive={item.isActive} to={item.to} />
        ))}
      </div>
      <div onClick={userSignOut} className="signup-button">Sign Out</div>
      <style jsx>{`
        .sidebar {
          border-radius: 20px;
          background-color: #05445e;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 20px;
          color: #fff;
          font-weight: 500;
          text-align: center;
          line-height: 160%;
          padding: 29px 20px;
          height: calc(100vh - 20px); /* Full height minus potential margins/padding */
          width: 200px; /* Fixed width */
          box-sizing: border-box; /* Ensure padding is included in the width and height */
          margin: 10px 15px;
          position:fixed;
        }
        .nav-items {
          flex-grow: 1;
        }
        .logo {
          aspect-ratio: 1.19;
          object-fit: auto;
          object-position: center;
          width: 100%;
          align-self: center;
        }
        .signup-button {
          text-decoration: none;
          color: inherit;
          border-radius: 18px;
          background-color: #05445e;
          justify-content: center;
          padding: 13px 20px;
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        .signup-button:hover {
          background-color: #fff;
          color: #05445e;
        }
      `}</style>
    </nav>
  );
}

export default Sidebar;
