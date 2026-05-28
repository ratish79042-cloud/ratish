import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "உன் key",
  authDomain: "உன் domain",
  projectId: "உன் project id",
  storageBucket: "உன் bucket",
  messagingSenderId: "உன் sender id",
  appId: "உன் app id"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);   
export const db = getFirestore(app); 
export const storage = getStorage(app);