import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOFiQRN6bYqq4N5mxOQ-nW5DNBgL_mrAg",
  authDomain: "movieapp-5065a.firebaseapp.com",
  projectId: "movieapp-5065a",
  storageBucket: "movieapp-5065a.appspot.com",
  messagingSenderId: "773939264227",
  appId: "1:773939264227:web:095c5349b2eab00e00e3d6",
};

export const fbApp = initializeApp(firebaseConfig);
export const auth = getAuth(fbApp);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(fbApp);
