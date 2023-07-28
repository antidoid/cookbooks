import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getImgUrl, loginUser } from "../utils/api.js";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSignIn(providerName) {
    try {
      await loginUser(providerName);
      navigate("/recipes");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="login">
      <div className="login--form">
        {error && <p className="error-message">{error.message}</p>}
        <img src={getImgUrl("login/elipses.png")} />
        <h2 className="login--header">Sign in with one of the providers</h2>
        <div className="login--button-container">
          <button
            onClick={() => handleSignIn("Google")}
            className="login--google"
          >
            <FcGoogle /> Continue with Google
          </button>

          <button
            onClick={() => handleSignIn("Github")}
            className="login--github"
          >
            <AiFillGithub /> Continue with Github
          </button>
        </div>
      </div>
      <div className="login--aside">
        <img src={getImgUrl("login/dish1.png")} />
        <img src={getImgUrl("login/dish2.png")} />
        <img src={getImgUrl("login/dish3.png")} />
      </div>
    </div>
  );
}
