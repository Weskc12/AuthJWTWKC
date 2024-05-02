import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

//leer el token de localStorage localStorage.getItem("token")
//hacer un fetch "GET", header (aqui tengo mmandar el token)
//tenemos q preguntarnos cuales de los endpoints necesitan token y cuales no. Y eso lo defino en el back en routes.py (si tiene el decorador "@jwt_required" necesita token)


export const Profile = () =>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleOnClick= () => actions.logout();

    return(
        !store.isLoggedIn ? navigate ('/login') :
        <div>
            <h1 className="text-center">Profile</h1>
            <div className="card text-center m-3">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    
                </div>
                <div className="card-footer text-body-secondary">
                    2 days ago
                </div>
            </div>
            <div className="text-center">
                <button href="#" className="btn btn-danger" onClick={handleOnClick}>Log out</button>
            </div>
        </div>
    )
}