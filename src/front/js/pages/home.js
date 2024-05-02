import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<h2>Sign up here</h2>
			<Link to="/signup">
					<button className="btn btn-secondary m-2">Sign Up</button>
				</Link>
			<h2>Log in here</h2>
				<Link to="/login">
					<button className="btn btn-outline-secondary m-2 mb-5">Log In</button>
				</Link>
			<p className="mt-5">
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
