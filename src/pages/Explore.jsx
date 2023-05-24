import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../utils/firebase.js";

const Explore = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <>
            {loading && <p>Please wait, loading user</p>}
            {user && (
                <div>
                    <span>Welcome to Cookboks, {user.displayName}</span>
                </div>
            )}
        </>
    );
};

export default Explore;
