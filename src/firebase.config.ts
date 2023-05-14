import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA_TzscWnr8mbyPhcBiQcD_KvtScagEh_A",
    authDomain: "restaurant-1a957.firebaseapp.com",
    projectId: "restaurant-1a957",
    storageBucket: "restaurant-1a957.appspot.com",
    messagingSenderId: "922052038494",
    appId: "1:922052038494:web:ca624506b04270c937c9cf",
    measurementId: "G-XZYBJC62MZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);