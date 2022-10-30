import { initializeApp } from 'firebase/app';
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "test",
    authDomain: "test",
    projectId: "test",
    storageBucket: "test",
    messagingSenderId: "test",
    appId: "test",
    measurementId: "test"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db  };
