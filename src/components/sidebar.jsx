import React from "react";
import NavItem from './NavItem';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './sidebar.css';

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
    </nav>
  );
}

export default Sidebar;
