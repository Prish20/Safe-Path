// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
    authDomain: "safe-path-a2de8.firebaseapp.com",
    projectId: "safe-path-a2de8",
    storageBucket: "safe-path-a2de8.appspot.com",
    messagingSenderId: "237101540978",
    appId: "1:237101540978:web:35ad60e4bf4802baf884eb"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
