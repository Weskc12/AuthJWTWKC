import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { Context } from "../store/appContext";

export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // 2. Initialize useNavigate



    const handleLogout = () => {
        actions.logout();
    };

    // //store.isLoggedIn == true -> esta logeado por lo tanto puede ver el dashboard
    // //store.isLoggedIn == false -> no esta logeado por lo tanto no puede ver el dashboard y lo llevo al login
    return (
        <div>
            {store.isLoggedIn ? (
                <>
                    <h1>Dashboard</h1>
                    <p>Welcome! You have signed up correctly</p>
                    {/* Add your dashboard content here */}
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                   {navigate("/login")} {/* 3. Use useNavigate to redirect to /login */}
                </>
            )}
        </div>
    );
};