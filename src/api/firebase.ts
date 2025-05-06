import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTgmCXiN88xjcQQwY476qOIqVJuspThsk",
  authDomain: "wedding-951b3.firebaseapp.com",
  projectId: "wedding-951b3",
  storageBucket: "wedding-951b3.firebasestorage.app",
  messagingSenderId: "181279022268",
  appId: "1:181279022268:web:814a302ca146b362a1c4b9",
  measurementId: "G-PH842V1XEQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
