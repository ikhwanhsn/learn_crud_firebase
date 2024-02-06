import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyBkXigW9JF2Majbhy-F5NSzc0RiuNdHB7c",
    authDomain: "learncrudfirebase-e131e.firebaseapp.com",
    databaseURL:
      "https://learncrudfirebase-e131e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learncrudfirebase-e131e",
    storageBucket: "learncrudfirebase-e131e.appspot.com",
    messagingSenderId: "737683789269",
    appId: "1:737683789269:web:6d085738d08a3bbc71595c",
    measurementId: "G-XWTRLDPL9C",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default FirebaseConfig;
