// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd0hnMibToTCZlO0rJyQc4mJnFBMxc9bY",
  authDomain: "auth-crud-test-a99d3.firebaseapp.com",
  projectId: "auth-crud-test-a99d3",
  storageBucket: "auth-crud-test-a99d3.appspot.com",
  messagingSenderId: "95620399522",
  appId: "1:95620399522:web:6f3bb18d04c09dd5c2b2fb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);