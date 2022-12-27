/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ7uOK215zRITGBoygbGh9yPzB_9DkgeQ",
  authDomain: "mymusiclist-9d1d6.firebaseapp.com",
  projectId: "mymusiclist-9d1d6",
  storageBucket: "mymusiclist-9d1d6.appspot.com",
  messagingSenderId: "272562396816",
  appId: "1:272562396816:web:f6a8dc32b52e3eae6a8215",
  measurementId: "G-FL2SWRH9F1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
