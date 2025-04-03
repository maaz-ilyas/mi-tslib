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

function showModal(message) {
  let modal = document.createElement("div");
  modal.id = "custom-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";

  let modalContent = document.createElement("div");
  modalContent.style.background = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "10px";
  modalContent.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  modalContent.style.textAlign = "center";

  let messageText = document.createElement("p");
  messageText.innerText = message;

  let closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "8px 16px";
  closeButton.style.border = "none";
  closeButton.style.background = "#007bff";
  closeButton.style.color = "white";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";

  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modalContent.appendChild(messageText);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Function to get real-time updates on a specified document
export function getData(keys, collectionName, docId, callback) {
  keys = {
    apiKey: "AIzaSyCkJLvwCc-Ucoge-J49nvEf2LcfRy9jRk4",
    authDomain: "dynamic-lib.firebaseapp.com",
    projectId: "dynamic-lib",
    storageBucket: "dynamic-lib.firebasestorage.app",
    messagingSenderId: "813340197124",
    appId: "1:813340197124:web:dfe1cffb422c55e2c89051",
  };

  if (!keys) {
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
    return onSnapshot(docRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        callback(data);
        if (data.isShown) {
          showModal("Important message!");
        }
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
