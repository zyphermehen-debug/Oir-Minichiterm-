import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Placeholder configuration - user should run set_up_firebase or provide real config
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "oir-minichiterm.firebaseapp.com",
  projectId: "oir-minichiterm",
  storageBucket: "oir-minichiterm.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
