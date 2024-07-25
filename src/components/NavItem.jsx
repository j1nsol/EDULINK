import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavItem({ label, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`nav-item ${isActive ? 'active' : ''}`}>
      <div className="nav-label">{label}</div>
      <style jsx>{`
        .nav-item {
          text-decoration: none;
          color: inherit;
        }
        .nav-item div {
          border-radius: 5px;
          background-color: #05445e;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 10px;
        }
        .nav-label {
          font-family: Poppins, sans-serif;
          border-radius: 18px;
          background-color: #05445e;
          justify-content: center;
          padding: 13px 20px;
        }
        .active {
          background-color: #fff;
        }
        .active .nav-label {
          background-color: #fff;
          color: #05445e;
        }
      `}</style>
    </Link>
  );
}

export default NavItem;
