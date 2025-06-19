import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2jVbZrdx1C7svJ6FksiJ082UmLSXaeNQ",
  authDomain: "exiva-moe-res.firebaseapp.com",
  projectId: "exiva-moe-res",
  storageBucket: "exiva-moe-res.firebasestorage.app",
  messagingSenderId: "95259758584",
  appId: "1:95259758584:web:e20e7a3f7fedf9d721500d",
  measurementId: "G-XYK27376P9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
