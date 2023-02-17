// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAprXY30Fuwj7Kjn1coVCVuKVPtuGPPDIo",
  authDomain: "bestdeal-ecommerce.firebaseapp.com",
  projectId: "bestdeal-ecommerce",
  storageBucket: "bestdeal-ecommerce.appspot.com",
  messagingSenderId: "284233517936",
  appId: "1:284233517936:web:79d0c7ff5506ed09d25db5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;