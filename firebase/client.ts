// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdBPz53Zf7GMchJydi3-UeszMHhD5xPV8",
  authDomain: "interviewx-io.firebaseapp.com",
  projectId: "interviewx-io",
  storageBucket: "interviewx-io.firebasestorage.app",
  messagingSenderId: "501933890393",
  appId: "1:501933890393:web:a62e0f88b0e17a87ad0a48",
  measurementId: "G-285YQQ70GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);