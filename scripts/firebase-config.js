/* FIREBASE SETUP */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoRP11Fg4h_uOM2JNFxlfdbIWyg1ryX94",
    authDomain: "portfolio-site-f9ccc.firebaseapp.com",
    projectId: "portfolio-site-f9ccc",
    storageBucket: "portfolio-site-f9ccc.appspot.com",
    messagingSenderId: "643628474044",
    appId: "1:643628474044:web:a96164f99abddd47e83ab9",
    measurementId: "G-KBL200L56X"
};

console.log("connected");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();