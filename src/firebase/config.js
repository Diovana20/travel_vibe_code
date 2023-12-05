import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

import { doc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, onSnapshot, } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBMqcrDs56KUzX1LU7AUu-xUd9AaYRWi30",
  authDomain: "travelvibe-c0f03.firebaseapp.com",
  projectId: "travelvibe-c0f03",
  storageBucket: "travelvibe-c0f03.appspot.com",
  messagingSenderId: "249688389087",
  appId: "1:249688389087:web:4cb7be032233e6d80a406a"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const db = getFirestore(app);
export{db};