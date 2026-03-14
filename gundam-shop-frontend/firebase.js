import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgqxBfqMqUlOUv4lsCLVZZ0dd5mKfJEy8",
  authDomain: "ocan-shop.firebaseapp.com",
  projectId: "ocan-shop",
  storageBucket: "ocan-shop.firebasestorage.app",
  messagingSenderId: "420054305233",
  appId: "1:420054305233:web:a2dc8a3290eee70537b8f0",
  measurementId: "G-2SYF7NJ3RV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);