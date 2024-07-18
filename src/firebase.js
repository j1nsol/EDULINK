import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBugsDDWzVI8bb1YyaTMRrI4LEyUl_xS1M",
  authDomain: "innovativex-academy.firebaseapp.com",
  databaseURL: "https://innovativex-academy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "innovativex-academy",
  storageBucket: "innovativex-academy.appspot.com",
  messagingSenderId: "129358359316",
  appId: "1:129358359316:web:f7dbeaca89489ab0df3001",
  measurementId: "G-NZMSZMSB2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);