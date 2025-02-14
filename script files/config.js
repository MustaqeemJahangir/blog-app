import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyByDTiQ82cG7vCDrwLoiSDCD5R4raTWHh8",
  authDomain: "authentication-web-3e036.firebaseapp.com",
  projectId: "authentication-web-3e036",
  storageBucket: "authentication-web-3e036.firebasestorage.app",
  messagingSenderId: "608841683620",
  appId: "1:608841683620:web:136984b7c63cb863e08c31"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


