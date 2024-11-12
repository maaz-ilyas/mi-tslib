import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

let firebaseApp;
let firestore;

export function initializeFirebase(keys) {
  if (!firebaseApp) {
    firebaseApp = initializeApp(keys);
    firestore = getFirestore(firebaseApp);
  }
}

// Function to get real-time updates on a specified document
export function getData(keys, collectionName, docId, callback) {
  if(!keys){
    throw new Error("Please provide the keys.");
  }
  // Ensure Firebase is initialized
  initializeFirebase(keys);

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
