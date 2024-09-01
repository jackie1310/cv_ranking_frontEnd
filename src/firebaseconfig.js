import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkMCSDpTJ9GgK0wcH4rTed656m-KGWkrs",
  authDomain: "bcu-study-spaces.firebaseapp.com",
  projectId: "bcu-study-spaces",
  storageBucket: "bcu-study-spaces.appspot.com",
  messagingSenderId: "786778083790",
  appId: "1:786778083790:web:c8ce283fe5259f1bfedb9f",
  measurementId: "G-8E331BQVHV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);