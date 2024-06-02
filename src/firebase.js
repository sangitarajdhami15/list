// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRG4lSJqiofBjy5_cC-VwoQx0ZfJvar08",
  authDomain: "upahar-35ee6.firebaseapp.com",
  databaseURL: "https://upahar-35ee6-default-rtdb.firebaseio.com",
  projectId: "upahar-35ee6",
  storageBucket: "upahar-35ee6.appspot.com",
  messagingSenderId: "618266505625",
  appId: "1:618266505625:web:ee04689afa863b6e796308",
  measurementId: "G-ZKDD6H4MZ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth }; // Correct export statement
