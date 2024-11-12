import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

let firebaseApp;
let firestore;

export function initializeFirebase() {
  if (!firebaseApp) {
    firebaseApp = initializeApp({
      apiKey: "AIzaSyB2EPNPKMV2ZhzVowFxFGA-mIi2wU1rHCQ",
      authDomain: "ludo-4de39.firebaseapp.com",
      projectId: "ludo-4de39",
      storageBucket: "ludo-4de39.firebasestorage.app",
      messagingSenderId: "897466104347",
      appId: "1:897466104347:android:c1d1d3cee1d5d9628056be",
    });
       firestore = getFirestore(firebaseApp);
  }
}

export async function getUsers() {
  if (!firestore) {
    throw new Error(
      "Firebase has not been initialized. Please call initializeFirebase first."
    );
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
}
