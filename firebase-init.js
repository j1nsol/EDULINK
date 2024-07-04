// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvodA3RAHz5OF8EaZY4ckOM5yxYc_8z4E",
  authDomain: "edulink-7a693.firebaseapp.com",
  projectId: "edulink-7a693",
  storageBucket: "edulink-7a693.appspot.com",
  messagingSenderId: "871304875084",
  appId: "1:871304875084:web:db6020248a8da5684bf8e9",
  measurementId: "G-62C7PJXR3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
