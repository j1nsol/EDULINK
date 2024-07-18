import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("sign out successful");
            navigate("/");
          })
          .catch((error) => console.log(error));
        }
  return (
    
    <div>
        <Sidebar></Sidebar>
    </div>
    
  )
}

export default Dashboard