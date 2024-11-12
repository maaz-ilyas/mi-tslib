import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

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

// Function to get real-time updates on a specified document
export function getData(collectionName, docId, callback) {
  // Ensure Firebase is initialized
  initializeFirebase();

  if (!firestore) {
    throw new Error("Firebase has not been initialized.");
  }

  try {
    // Set up a real-time listener for the specified document
    const docRef = doc(firestore, collectionName, docId);
    return onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        callback(data); // Pass the data to the callback for further handling
      } else {
        console.log("No such document!");
        callback(null);
      }
    });
  } catch (error) {
    throw new Error("Failed to fetch document: " + error.message);
  }
}
