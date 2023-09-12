import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"


const firebaseApp = initializeApp({
  apiKey: "AIzaSyD0b3UErWXzzt3Lj5Deg2g_IH2AVSRVFx4",
  authDomain: "moralist208-chat.firebaseapp.com",
  projectId: "moralist208-chat",
  storageBucket: "moralist208-chat.appspot.com",
  messagingSenderId: "1007417867196",
  appId: "1:1007417867196:web:29be913f75672a0e56c9b9",
  measurementId: "G-36Z9WV67V2"
});


export const auth = getAuth(firebaseApp);
