// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdhDi4GsywDFMhERYN114xT_A8Wu7fc1U",
    authDomain: "flipkart-b0af5.firebaseapp.com",
    projectId: "flipkart-b0af5",
    storageBucket: "flipkart-b0af5.appspot.com",
    messagingSenderId: "346395903917",
    appId: "1:346395903917:web:90776b8d6421767b0c0324",
    measurementId: "G-EMGTJJWCGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app)

export { auth, db }
