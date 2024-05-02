import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // when user clicks on button Login I want it to send to the back-end the variables with the email and password. For that I do a fetch
    const handleOnClick = async () => {
        const url = process.env.BACKEND_URL + "/api/login"; 
        const options = {
            method: "POST",
            body: JSON.stringify({email:email, password:password}), //send as object// email & password need to match whatever we set in the back-end in the login route
            headers: {
                "Content-Type": "application/json"}
        }
        const response = await fetch(url, options);
        if (!response.ok){
            console.log("Error:", response.status, response.statusText)
            console.log(email, password)
        }
        const data = await response.json();
        actions.login(data.access_token)
        //localStorage.setItem("token",data.access_token);
        console.log(data);
        console.log(response);
        }

        return (
            <div>
                {store.isLoggedIn ? (
                    navigate("/dashboard")
                ) : (
                    <div>
                        <h1 className="text-center">Login</h1>
                        {/* 1. form with at least 2 inputs (email and password)
                            2. control those inputs with onChange and useState
                        */}
                        <div className="m-3">
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
                                <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <button className="btn btn-secondary m-2" onClick={handleOnClick}>Login</button>
                            </div>
                        </div>
                )}
            </div>
        );
    };