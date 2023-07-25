import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuqmDNlayCz_TWpq7wsXD0ih960eD3AAs",
    authDomain: "cookbooks-ad583.firebaseapp.com",
    projectId: "cookbooks-ad583",
    storageBucket: "cookbooks-ad583.appspot.com",
    messagingSenderId: "224316404113",
    appId: "1:224316404113:web:01a278d1f81c5298abaa30",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
