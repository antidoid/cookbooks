import { initializeApp } from "firebase/app";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function loginUser(providerName: "Google" | "Github") {
  let provider: AuthProvider;
  if (providerName === "Google") provider = new GoogleAuthProvider();
  else provider = new GithubAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (err: any) {
    throw {
      message: err.message,
    };
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (err) {
    throw {
      message: err.message,
    };
  }
}
