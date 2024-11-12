const firebase = require("firebase/app");
require("firebase/firestore");

let firebaseApp;

function initializeFirebase() {
  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyB2EPNPKMV2ZhzVowFxFGA-mIi2wU1rHCQ",
      authDomain: "ludo-4de39.firebaseapp.com",
      projectId: "ludo-4de39",
      storageBucket: "ludo-4de39.firebasestorage.app",
      messagingSenderId: "897466104347",
      appId: "1:897466104347:android:c1d1d3cee1d5d9628056be",
    });
  }
}

async function getUsers() {
  if (!firebaseApp) {
    throw new Error(
      "Firebase has not been initialized. Please call initializeFirebase first."
    );
  }

  try {
    const firestore = firebaseApp.firestore();
    const snapshot = await firestore.collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
}

async function main() {
  try {
    initializeFirebase();
    const users = await getUsers();
    console.log("Fetched users:", users);
  } catch (error) {
    console.error("Error:", error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { initializeFirebase, getUsers };
