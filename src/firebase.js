// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3O9WLVgq_a3yy5uU2o-h2n8r9uW-OFns",
  authDomain: "portfolio-aleson.firebaseapp.com",
  databaseURL: "https://portfolio-aleson-default-rtdb.firebaseio.com",
  projectId: "portfolio-aleson",
  storageBucket: "portfolio-aleson.firebasestorage.app",
  messagingSenderId: "558038775248",
  appId: "1:558038775248:web:755ebca3365665f938f5d5",
  measurementId: "G-BRWQ1ZWN0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
export const db = getDatabase(app);

export default app;
