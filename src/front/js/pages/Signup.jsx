import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const url = process.env.BACKEND_URL + "/api/signup";
        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log(response.status, response.statusText);
            console.log(email, password)
            return response.status
        }
        const data = await response.json();
        actions.login(data.access_token)
        // localStorage.setItem("token", data.access_token);
        console.log(data.access_token);
        return data
    }

    return (
        <div>
            {store.isLoggedIn ? (
                 navigate ("/dashboard")
            ) : (
                <div>
                    <h1 className="text-center">Sign Up</h1>
                    {/* 1. form with at least 2 inputs (email and password)
                        2. control those inputs with onChange and useState
                    */}
                    <div className="m-3">
                        <form onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">email/Email:</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-secondary m-2" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};