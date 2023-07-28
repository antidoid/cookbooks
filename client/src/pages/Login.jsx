import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { loginUser } from "../utils/api.js";
import { useNavigate } from "react-router-dom";

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
    <div>
      {error && <p>{error.message}</p>}
      <h2>Join Today</h2>
      <h3>Sign in with one of the providers</h3>
      <div>
        <button onClick={() => handleSignIn("Google")}>
          <FcGoogle /> Sign in with Google
        </button>

        <button onClick={() => handleSignIn("Github")}>
          <AiFillGithub /> Sign in with Github
        </button>
      </div>
    </div>
  );
}
