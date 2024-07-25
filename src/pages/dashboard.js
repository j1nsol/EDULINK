import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import StudentCard from "../components/student-card";
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
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <StudentCard />
                <div className="container-dashboard">
                    {/* Add your dashboard content here */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
