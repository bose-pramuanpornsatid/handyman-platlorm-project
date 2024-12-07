import ReactDOM from 'react-dom/client'
import './global.css'

import App from './App'

// Firebase init
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX_9tn8YsizxDQNkrfBIUQSK6eCwqaH0g",
  authDomain: "jobkinator.firebaseapp.com",
  projectId: "jobkinator",
  storageBucket: "jobkinator.firebasestorage.app",
  messagingSenderId: "538751512151",
  appId: "1:538751512151:web:c5923b0d4e042505217d12",
  measurementId: "G-XXZN09CHM3"
};

// Initialize Firebase if not already initialized
let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
  getAnalytics(app)
}

// Initialize Firebase Auth
const auth = getAuth(app)

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(<App />)

export { auth }