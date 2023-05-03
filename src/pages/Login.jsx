import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../utils/firebase.js";

const Login = () => {
  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(res.user);
    } catch (e) {
      console.log(e);
    }
  };

  const loginWithGithub = async () => {
    try {
      const res = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(res.user);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="shadow-xl sm:w-3/4 mx-auto md:w-1/2 lg:w-1/3 mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-3xl font-medium">Join Today</h2>
      <h3 className="py-8">Sign in with one of the provides</h3>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={loginWithGoogle}
          className="text-white bg-gray-700 p-4 w-full flex align-middle gap-2 font-medium rounded-lg"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>

        <button
          onClick={loginWithGithub}
          className="text-white bg-gray-700 p-4 w-full flex align-middle gap-2 font-medium rounded-lg"
        >
          <AiFillGithub className="text-2xl" /> Sign in with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
