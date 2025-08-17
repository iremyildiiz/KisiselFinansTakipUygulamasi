// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDChM70c8kzr5T6Iawl-kPkfBDdcJZftps",
  authDomain: "perconalfinance.firebaseapp.com",
  projectId: "perconalfinance",
  storageBucket: "perconalfinance.appspot.com",
  messagingSenderId: "354086627541",
  appId: "1:354086627541:android:a67b38cbce531e7d6d9a5c" // bunu Firebase → Project settings → General → App info kısmından al
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
