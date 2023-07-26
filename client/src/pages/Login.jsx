import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../utils/firebase.js";

const Login = () => {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      console.log(e);
    }
  };

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h2>Join Today</h2>
      <h3>Sign in with one of the provides</h3>
      <div>
        <button onClick={loginWithGoogle}>
          <FcGoogle /> Sign in with Google
        </button>

        <button onClick={loginWithGithub}>
          <AiFillGithub /> Sign in with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
