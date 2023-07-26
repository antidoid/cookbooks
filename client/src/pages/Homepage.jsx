import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <div>
            <h1>Welcome to Cookbooks</h1>
            <Link to="login">Login/SignUp</Link>
        </div>
    );
}
