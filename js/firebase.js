// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCANb9a0-6_C55qeZ-YY39tqB5B79cZ0BE",
  authDomain: "nyano-kakh.firebaseapp.com",
  databaseURL: "https://nyano-kakh-default-rtdb.firebaseio.com",
  projectId: "nyano-kakh",
  storageBucket: "nyano-kakh.firebasestorage.app",
  messagingSenderId: "1073797907279",
  appId: "1:1073797907279:web:7ecbabb467bc7ba8b17b3a",
  measurementId: "G-9Y9V54HVKW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, database, auth };
