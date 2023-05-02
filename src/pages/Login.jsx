import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
    return (
        <div>
            <div className="shadow-xl md:mx-auto md:w-1/2 lg:w-1/3 mt-32 p-10 text-gray-700 rounded-lg">
                <h2 className="text-3xl font-medium">Join Today</h2>
                <h3 className="py-8">Sign in with one of the provides</h3>
                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={loginWithGoogle}
                        className="text-white bg-gray-700 p-4 w-full flex align-middle gap-2 font-medium rounded-lg"
                    >
                        <FcGoogle className="text-2xl" /> Sign in with Google
                    </button>
                    <button className="text-white bg-gray-700 p-4 w-full flex align-middle gap-2 font-medium rounded-lg">
                        <AiFillFacebook className="text-2xl" /> Sign in with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
