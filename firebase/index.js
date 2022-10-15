// Login firebase with google account
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Development

// const firebaseConfig = { 
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

// Production

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };


// Test 
const firebaseConfig = {
  apiKey: 'AIzaSyAAN286CcHuiPEe5Q5G7ot3NSTVe6r7I9M',
  authDomain: 'honey-badgers-scrum-poker.firebaseapp.com',
  projectId: 'honey-badgers-scrum-poker',
  storageBucket: 'honey-badgers-scrum-poker.appspot.com',
  messagingSenderId: '338587899637',
  appId: '1:338587899637:web:a6318b57575f980e8557bc',
  measurementId: 'G-9G0WRFV3DB',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
