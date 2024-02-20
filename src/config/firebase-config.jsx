// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1sWGIbNLR40VRfW-yTiENBRqggtdd7bg",
  authDomain: "blog-7fef8.firebaseapp.com",
  projectId: "blog-7fef8",
  storageBucket: "blog-7fef8.appspot.com",
  messagingSenderId: "356756034949",
  appId: "1:356756034949:web:6602d6a74751b7320660ec",
  measurementId: "G-L5X49RPFF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)

//firebase login
//firebase init
//firebase deploy