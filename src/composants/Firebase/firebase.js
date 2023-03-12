// Firebase v9
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from 'firebase/firestore'


const config = {
    apiKey: "AIzaSyCedG97GPDJy-YQ-rrEOafM97BDziaRc6o",
    authDomain: "marvel-quiz-1638c.firebaseapp.com",
    projectId: "marvel-quiz-1638c",
    storageBucket: "marvel-quiz-1638c.appspot.com",
    messagingSenderId: "388647465364",
    appId: "1:388647465364:web:8f8d1c40dc141340e89f81"
  };


  const app = initializeApp(config);
  export const auth = getAuth(app);
  
  export const firestore = getFirestore();
  
  export const user = uid => doc(firestore, `users/${uid}`);
  
  