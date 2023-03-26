import {initializeApp} from "firebase/app";
import "firebase/auth";
// import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBqRrjf1JRFARJnlMN2snmTnY7gN_UDGOM",
  authDomain: "sports-13605.firebaseapp.com",
  databaseURL: "https://sports-13605-default-rtdb.firebaseio.com",
  projectId: "sports-13605",
  storageBucket: "sports-13605.appspot.com",
  messagingSenderId: "1095400890184",
  appId: "1:1095400890184:web:6d99ef40ae9ef2d9e79d7d",
  measurementId: "G-K6JQGTE9CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = firebase.auth();
//export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const db = firebase.firestore();
export default app;
// export const provider = new firebase.auth.GoogleAuthProvider();