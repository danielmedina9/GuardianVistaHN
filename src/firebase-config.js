// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBC0p_s0BkWG6VChBdzzSat9_v2JgRVro8",
  authDomain: "guardianvistahn-95de1.firebaseapp.com",
  projectId: "guardianvistahn-95de1",
  storageBucket: "guardianvistahn-95de1.appspot.com",
  messagingSenderId: "833188375408",
  appId: "1:833188375408:web:77e3610c9e72c6e4727db5"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
