// index.js
const firebase = require("firebase/app");
require("firebase/firestore");

let firebaseApp;

function initializeFirebase() {
  if (!firebase.apps.length) {
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
    const snapshot = await firebaseApp.firestore().collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users: " + error.message);
  }
}

module.exports = { initializeFirebase, getUsers };
