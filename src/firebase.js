import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3O9WLVgq_a3yy5uU2o-h2n8r9uW-OFns",
  authDomain: "portfolio-aleson.firebaseapp.com",
  databaseURL: "https://portfolio-aleson-default-rtdb.firebaseio.com",
  projectId: "portfolio-aleson",
  storageBucket: "portfolio-aleson.firebasestorage.app",
  messagingSenderId: "558038775248",
  appId: "1:558038775248:web:755ebca3365665f938f5d5",
  measurementId: "G-BRWQ1ZWN0T"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Realtime Database
export const db = getDatabase(app)

export default app
