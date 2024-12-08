import { initializeApp, firebase } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCDK52HhI7jGczaMYuKoW8Aqwv7xyxq5Gk",
  authDomain: "final-project-6232a.firebaseapp.com",
  databaseURL: "https://final-project-6232a-default-rtdb.firebaseio.com",
  projectId: "final-project-6232a",
  storageBucket: "final-project-6232a.firebasestorage.app",
  messagingSenderId: "697343397755",
  appId: "1:697343397755:web:37b421e2726559d52377de",
  measurementId: "G-HTDHSKNRKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export const storage = getStorage(app);

export default app;